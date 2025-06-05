# Bug1. Special Character Display Issues

Severity: Low
Component: ChatUI
Steps to Reproduce:

- Type and send a message containing RTL (right-to-left) text: "مرحبا بالعالم"
- Type and send a message with mixed RTL and LTR text
- Observe text alignment and display (especially while typing and editing text)

### Expected Behavior:
RTL text should display correctly with proper text direction and alignment
### Actual Behavior:
RTL text sometimes displays with incorrect alignment or overlaps with UI elements
### Impact:

- Poor experience for users of RTL languages
- Text readability issues
- Potential layout breaking with mixed content

Reproduction Rate: Consistent with specific RTL character combinations
Suggested Fix:
Implement proper CSS direction and unicode-bidi properties, along with text direction detection for mixed content.