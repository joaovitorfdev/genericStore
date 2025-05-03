import * as Yup from "yup";

export const CustomerValidatorSchema = Yup.object({
name: Yup.string()
        .strict()
        .trim("O nome não pode conter espaços no início ou no final")
        .max(20, "O nome deve ter no máximo 20 caracteres")
        .required("")
        .min(5, "O nome deve ter pelo menos 5 caracteres")
        .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ]*$/, "O nome não pode conter caracteres especiais")
        .test("no-only-spaces", "O nome não pode conter apenas espaços", value => {
            return !!value && value.trim().length > 0;
        })
        .test("no-only-numbers", "O nome não pode conter apenas números", value => {
            return !/^\d+$/.test(value || "");
        }),
    document: Yup.string()
        .strict() 
        .trim("O documento não pode conter espaços no início ou no final")
        .min(11, "deve ter no mínimo 11 caracteres")
        .max(14, "deve ter no máximo 14 caracteres")
        .required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(5, "deve ter no minimo 5 caracteres")
  
});