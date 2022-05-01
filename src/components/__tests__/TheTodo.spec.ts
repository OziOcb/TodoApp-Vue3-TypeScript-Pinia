import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import TheTodo from "../TheTodo.vue";

describe("TheTodo", () => {
  it("renders properly", () => {
    const wrapper = mount(TheTodo);
    expect(wrapper.exists()).toBe(true);
  });
});
