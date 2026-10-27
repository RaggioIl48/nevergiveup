import { api } from "../api.js";
import { h, mount } from "../dom.js";

export function authView(root, ctx) {
  let mode = "login";
  const render = (error = "") => {
    const isReg = mode === "register";
    const name = h("input", { id: "f-name", class: "answer-input", autocomplete: "username", required: true, maxlength: "24" });
    const password = h("input", { id: "f-pass", class: "answer-input", type: "password", autocomplete: isReg ? "new-password" : "current-password", required: true, minlength: "6" });
    const invite = h("input", { id: "f-invite", class: "answer-input", autocomplete: "off", required: true });
    const form = h("form", { class: "auth-form", onSubmit: async (event) => {
      event.preventDefault();
      const submit = form.querySelector("button[type=submit]");
      submit.disabled = true;
      try {
        await api(isReg ? "/register" : "/login", { name: name.value, password: password.value, invite: invite.value });
        await ctx.refresh();
        ctx.go(ctx.me.user.level ? "#/home" : "#/diagnostic");
      } catch (e) {
        render(e.message);
      }
    } },
      h("label", { for: "f-name" }, "Name"), name,
      h("label", { for: "f-pass" }, "Password"), password,
      isReg ? [h("label", { for: "f-invite" }, "Invite code"), invite, h("p", { class: "hint" }, "Ask the person who invited you.")] : null,
      error ? h("p", { class: "form-error", role: "alert" }, error) : null,
      h("button", { class: "key key-primary wide", type: "submit" }, isReg ? "Create account" : "Log in"),
    );
    mount(root, h("main", { class: "auth" },
      h("h1", { class: "brand" }, "Upword"),
      h("p", { class: "tagline" }, "English from B1 to B2, with a challenge at every step."),
      form,
      h("button", { class: "link", type: "button", onClick: () => { mode = isReg ? "login" : "register"; render(); } },
        isReg ? "I already have an account" : "Create a new account"),
    ));
    name.focus();
  };
  render();
}
