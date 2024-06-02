import { render, screen } from "@testing-library/react";

function ColorList() {
  return (
    <ul>
      <li>Red</li>
      <li>Blue</li>
      <li>Green</li>
    </ul>
  );
}

test("getBy, queryBy, findBy finding 0 elements", async () => {
  render(<ColorList />);

  expect(() => screen.getByRole("textbox")).toThrow();

  expect(screen.queryByRole("textbox")).toEqual(null);

  let errorThrown = false;
  try {
    await screen.findByRole("textbox");
  } catch (err) {
    errorThrown = true;
  }
  expect(errorThrown).toEqual(true);
});
