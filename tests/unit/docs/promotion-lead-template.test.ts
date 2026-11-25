import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { load } from "js-yaml";

interface CheckboxOption {
  label: string;
  description?: string;
  required?: boolean;
}

interface FormField {
  id?: string;
  type: string;
  attributes: {
    label?: string;
    description?: string;
    value?: string;
    options?: Array<string | CheckboxOption>;
  };
  validations?: { required?: boolean };
}

const template = new URL("../../../.github/ISSUE_TEMPLATE/promotion_lead.yml", import.meta.url);
const source = await readFile(template, "utf8");
const form = load(source) as { labels: string[]; body: FormField[] };

function field(id: string, type: string, required: boolean): FormField {
  const entry = form.body.find((item) => item.id === id);
  assert.ok(entry, `Missing field: ${id}`);
  assert.equal(entry.type, type, id);
  assert.equal(entry.validations?.required ?? false, required, id);
  return entry;
}

test("promotion leads ask for the offer and where it was found", () => {
  assert.ok(form.labels.includes("promotion-lead"));
  field("provider", "input", true);
  const officialUrl = field("official_url", "input", true);
  assert.equal(officialUrl.attributes.label, "Link to the offer");
  const description = officialUrl.attributes.description ?? "";
  assert.match(description, /\boffer page on the provider's own site\b/i);
  assert.match(description, /\bif the provider hasn't published the offer\b/i);
  assert.match(description, /\bprovider's homepage\b/i);
  assert.match(description, /\bwhere you saw (?:it|the offer) in the details\b/i);
  assert.match(description, /\bunverified\b/i);
  field("what_is_offered", "textarea", true);
  field("ends_on", "input", false);
  const sourceUrl = field("seen_at_url", "input", false);
  assert.match(sourceUrl.attributes.description ?? "", /\bif it differs from the offer link\b/i);

  const seenOn = form.body.find((item) => item.id === "seen_on");
  assert.ok(seenOn, "Missing field: seen_on");
  assert.equal(seenOn.type, "dropdown");
  assert.deepEqual(seenOn.attributes.options, [
    "X",
    "Reddit",
    "Discord",
    "Telegram",
    "linux.do",
    "Hacker News",
    "Newsletter",
    "Provider's own site",
    "Other",
  ]);
});

test("promotion leads require both confirmations and leave the reward optional", () => {
  const options = form.body
    .filter((entry) => entry.type === "checkboxes")
    .flatMap((entry) => entry.attributes.options ?? [])
    .filter((option) => typeof option !== "string");
  for (const label of [
    "The link is on the provider's own domain",
    "This is not a shared key, wallet offer or multi-account trick",
  ]) {
    assert.equal(options.find((option) => option.label === label)?.required, true, label);
  }

  const reward = field("reward", "checkboxes", false);
  const rewardOption = reward.attributes.options?.find(
    (option) =>
      typeof option !== "string" &&
      option.label ===
        "I'd like to be considered for a reward if this offer turns out to be valid and goes live. You can reach me through this issue."
  );
  assert.ok(rewardOption && typeof rewardOption !== "string", "Missing reward opt-in");
  assert.ok(rewardOption.required === undefined || rewardOption.required === false);
  assert.doesNotMatch(source, /\$|\b(?:USD|d[oó]lar(?:es)?|dollars?)\b/i);
  assert.doesNotMatch(source, /\brewards?\b[^.!?]*\bcredits?\b|\bcredits?\b[^.!?]*\brewards?\b/i);
  assert.doesNotMatch(JSON.stringify(reward.attributes), /\bcredits?\b/i);
});

test("promotion leads explain review and keep submitter identity optional", () => {
  assert.equal(form.body[0]?.type, "markdown");
  const intro = form.body[0].attributes.value ?? "";
  assert.match(intro, /\ba post is a lead\b/i);
  assert.match(intro, /\bverification takes more than a post\b/i);
  assert.match(intro, /\ba person checks every offer before we publish it\b/i);
  assert.match(intro, /\bby default, radar leaves your identity out of its records\b/i);
  assert.match(intro, /\bif you opt in for a reward, radar keeps your identity\b/i);

  for (const { attributes } of form.body) {
    const options = (attributes.options ?? []).filter((option) => typeof option !== "string");
    for (const { label, description } of [attributes, ...options]) {
      assert.doesNotMatch(label ?? "", /handle|username|author|@/i);
      assert.doesNotMatch(description ?? "", /handle|username|author|@/i);
    }
  }
});
