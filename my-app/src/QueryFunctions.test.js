import { useState, useEffect } from "react";
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

test("getBy, queryBy, findBy when they find one element", async () => {
  render(<ColorList />);

  expect(screen.getByRole("list")).toBeInTheDocument();
  // expect(screen.queryByRole("list")).toBeInTheDocument();
  expect(await screen.findByRole("list")).toBeInTheDocument();
});

test("getBY, queryBy, findBy when finding > 1 elements", async () => {
  render(<ColorList />);

  expect(() => screen.getByRole("listitem")).toThrow();

  expect(() => screen.queryByRole("listitem")).toThrow();

  let errorThrown = false;
  try {
    await screen.findByRole("listitem");
  } catch (err) {
    errorThrown = true;
  }
  expect(errorThrown).toEqual(true);
});

test("getAllBy, queryAllBy, findAllBy", async () => {
  render(<ColorList />);

  expect(screen.getAllByRole("listitem")).toHaveLength(3);
  expect(screen.queryAllByRole("listitem")).toHaveLength(3);
  expect(await screen.findAllByRole("listitem")).toHaveLength(3);
});

test("favor using getBy to prove an element exists", () => {
  render(<ColorList />);

  const element = screen.getByRole("list");

  expect(element).toBeInTheDocument();
});

test("favor queryBy when proving an element does not exist", () => {
  render(<ColorList />);

  const element = screen.queryByRole("textbox");

  expect(element).not.toBeInTheDocument();
});

function fakeFetchColors() {
  return Promise.resolve(["red", "green", "blue"]);
}

function LoadableColorList() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fakeFetchColors().then((c) => setColors(c));
  }, []);

  const renderedColors = colors.map((color) => {
    return <li key={color}>{color}</li>;
  });

  return <ul>{renderedColors}</ul>;
}

test("favor findBy or findAllBy when data fetching", async () => {
  render(<LoadableColorList />);

  const els = await screen.findAllByRole("listitem");

  expect(els).toHaveLength(3);
});
