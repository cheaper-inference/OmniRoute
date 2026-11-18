// What a kit Alert renders as its dismiss control: the class (packages/ui-kit/src/alert.tsx) and
// its default accessible name. A hidden button still counts: jsdom applies no Tailwind, so a
// `[&>…]:hidden` class would leave the button in the DOM and fail assertions using this selector.
// standalone-notices-kit-alert.test.tsx checks it still matches a dismissable Alert.
export const KIT_ALERT_DISMISS = '.ci-alert__dismiss, button[aria-label="Dismiss alert"]';
