PR title and description edits now keep separate concurrency groups and skipped
check names, preserving the running code validation. Base retargets, new commits,
and edits without recognized metadata continue to request the normal CI gates.
