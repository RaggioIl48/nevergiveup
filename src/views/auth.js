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
      h("label", { for: "f-name" }, "Nombre"), name,
      h("label", { for: "f-pass" }, "Contraseña"), password,
      isReg ? [h("label", { for: "f-invite" }, "Código de invitación"), invite, h("p", { class: "hint" }, "Pídeselo a quien te invitó.")] : null,
      error ? h("p", { class: "form-error", role: "alert" }, error) : null,
      h("button", { class: "key key-primary wide", type: "submit" }, isReg ? "Crear cuenta" : "Entrar"),
    );
    mount(root, h("main", { class: "auth" },
      h("h1", { class: "brand" }, "Upword"),
      h("p", { class: "tagline" }, "Inglés de B1 a B2, un poco más difícil que lo fácil."),
      form,
      h("button", { class: "link", type: "button", onClick: () => { mode = isReg ? "login" : "register"; render(); } },
        isReg ? "Ya tengo cuenta" : "Crear una cuenta nueva"),
    ));
    name.focus();
  };
  render();
}
