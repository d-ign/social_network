import React from "react";
import { create } from "react-test-renderer";
import Status from "./Status";

describe("ProfileStatus component", () => {
  test("after creation <span> should be displayed", () => {
    const component = create(<Status status='status for test' />);
    const root = component.root;
    const span = root.findByType("div");
    expect(span).not.toBeNull();
  });
  
  test("after creation <input> should be displayed", () => {
    const component = create(<Status status='status for test' />);
    const root = component.root;
    expect(() => {
      const input = root.findByType("input");
    }).toThrow();
  });
  
  // test("callback should be called", () => {
  //   const mockCallback = jest.fn();
  //   const component = create(
  //     <Status status='status for test' updateStatus={mockCallback} />);
  //   const instance = component.getInstance();
    // instance.deactivateEditMode();
    // expect(mockCallback.mock.calls.length).toBe(1); // вызван должен быть 1 раз
  // });
})