#!/usr/bin/env sh
# Guard de identidade de commit — previne misattribution de autoria.
#
# Context (see .mailmap at the root): this checkout has already produced TWO windows of
# commits com autoria trocada, ambas por um override de identidade deixado para

#   1. 2026-08-13..26 — nome "Xiangzhe" + e-mail de @backryun (237 commits)
#   2. 2026-08-29..09-02 — nome "Markus Hartung" + e-mail do mantenedor (59 commits)
#
# This gate DOES NOT impose a single identity: contributors commit normally
# com a sua, e creditar um contribuidor via `--author` continua funcionando.
# It only blocks the two signatures of the defect:
#   (a) a COMMITTER who is not the identity of this machine (takes both windows);
#   (b) um AUTHOR com o e-mail do mantenedor sob o nome de outra pessoa;
#   (c) um e-mail explicitamente aposentado (`omniroute.legacyEmail`).
#

#   git config --global omniroute.expectedName  "diegosouzapw"
#   git config --global omniroute.expectedEmail "8016841+diegosouzapw@users.noreply.github.com"
#   git config --global --add omniroute.legacyEmail "diegosouzapw@users.noreply.github.com"

expected_name=$(git config --get omniroute.expectedName 2>/dev/null)
expected_email=$(git config --get omniroute.expectedEmail 2>/dev/null)
legacy_emails=$(git config --get-all omniroute.legacyEmail 2>/dev/null)

# Without configuration on this machine, the gate does not take a stance — contributors are not affected.
[ -z "$expected_email" ] && exit 0

an=$(git var GIT_AUTHOR_IDENT    2>/dev/null | sed 's/ <.*//')
ae=$(git var GIT_AUTHOR_IDENT    2>/dev/null | sed 's/.*<//; s/>.*//')
cn=$(git var GIT_COMMITTER_IDENT 2>/dev/null | sed 's/ <.*//')
ce=$(git var GIT_COMMITTER_IDENT 2>/dev/null | sed 's/.*<//; s/>.*//')

fail=0

# (a) The COMMITTER is the person who performs the commit — on this machine, it is always the owner.

#     e foi o que passou despercebido nas duas janelas: em agosto NEM o nome NEM
#     the email was from the maintainer, so checking only their email would not be enough.
if [ "$ce" != "$expected_email" ] || { [ -n "$expected_name" ] && [ "$cn" != "$expected_name" ]; }; then
  echo "🛑 COMMITTER is not the identity of this machine: $cn <$ce>" >&2
  fail=1
fi

# (b) The AUTHOR may be a contributor (credit via --author), but can never
#     carregar o e-mail do mantenedor sob o nome de outra pessoa.
if [ -n "$expected_name" ] && [ "$ae" = "$expected_email" ] && [ "$an" != "$expected_name" ]; then
  echo "🛑 AUTHOR combina o e-mail do mantenedor com outro nome: $an <$ae>" >&2
  fail=1
fi

# (c) Retired email addresses that have already caused misattribution.
for legacy in $legacy_emails; do
  if [ "$ae" = "$legacy" ]; then
    echo "🛑 AUTHOR usa e-mail aposentado: $an <$ae>" >&2
    fail=1
  fi
  if [ "$ce" = "$legacy" ]; then
    echo "🛑 COMMITTER usa e-mail aposentado: $cn <$ce>" >&2
    fail=1
  fi
done

[ "$fail" = "0" ] && exit 0

cat >&2 <<MSG

   Expected identity on this machine: $expected_name <$expected_email>
   Correct with:
     git config --global user.name  "$expected_name"
     git config --global user.email "$expected_email"
   To credit a contributor, use THEIR EMAIL (never yours):
     git commit --author="Nome <email-do-contribuidor>"
MSG
exit 1
