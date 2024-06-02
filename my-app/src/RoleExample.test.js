import { render, screen } from "@testing-library/react";

function RoleExample() {
  return (
    <div>
      <a href="/">Link</a>
      <button>Button</button>
      <footer>Contentinfo</footer>
      <h1>Heading</h1>
      <header>Banner</header>
      <img alt="description" /> img
      <input type="checkbox" /> checkbox
      <input type="number" /> Spinbutton
      <input type="radio" /> Radio
      <input type="text" /> Textbox
      <li>Listitem</li>
      <ul>Listgroup</ul>
    </div>
  );
}

test("can find elements by role", () => {
  render(<RoleExample />);

  const roles = [
    "link",
    "button",
    "contentinfo",
    "heading",
    "banner",
    "img",
    "checkbox",
    "spinbutton",
    "radio",
    "textbox",
    "listitem",
    "list",
  ];

  for (let role of roles) {
    const el = screen.getByRole(role);

    expect(el).toBeInTheDocument();
  }
});

function AccessibleName() {
  return (
    <div>
      <button>Submit</button>
      <button>Cancel</button>
    </div>
  );
}

test("can select by accessible name", () => {
  render(<AccessibleName />);

  const submitButton = screen.getByRole("button", { name: /submit/i });
  const cancelButton = screen.getByRole("button", { name: /cancel/i });

  expect(submitButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});