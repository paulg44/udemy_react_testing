import { screen, render } from "@testing-library/react";
import { useState } from "react";

function DataForm() {
  const [email, setEmail] = useState("asdf@asdf.com");

  return (
    <form>
      <h3>Enter Data</h3>
      <div data-testid="image wrapper">
        <img alt="data" src="gata.jpg" />
      </div>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="color">Color</label>
      <input id="color" placeholder="Red" />

      <button title="Click when ready to submit">Submit</button>
    </form>
  );
}

test("selecting different elements", () => {
  render(<DataForm />);

  const elements = [
    screen.getByRole("button"),
    screen.getByLabelText(/email/i),
    screen.getByPlaceholderText(/red/i),
    screen.getByText("Enter Data"),
    screen.getByDisplayValue("asdf@asdf.com"),
    screen.getByAltText("data"),
    screen.getByTitle("Click when ready to submit"),
    screen.getByTestId("image wrapper"),
  ];

  for (let element of elements) {
    expect(element).toBeInTheDocument();
  }
});
