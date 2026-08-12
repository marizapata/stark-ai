import { describe, expect, test } from "vitest";

import {
  isValidMessage,
  createMessage,
  limitHistory
} from "../src/utils.js";


/* ==========================
   TEST 1
========================== */

test("rechaza un mensaje vacío", () => {

  expect(isValidMessage("")).toBe(false);

});


/* ==========================
   TEST 2
========================== */

test("acepta un mensaje con contenido", () => {

  expect(isValidMessage("Hola Tony")).toBe(true);

});


/* ==========================
   TEST 3
========================== */

test("crea correctamente un mensaje", () => {

  expect(
    createMessage("user", "Hola Tony")
  ).toEqual({
    role: "user",
    content: "Hola Tony"
  });

});


/* ==========================
   TEST 4
========================== */

test("limita el historial a los últimos 8 mensajes", () => {

  const history = [
    { role: "user", content: "Mensaje 1" },
    { role: "user", content: "Mensaje 2" },
    { role: "user", content: "Mensaje 3" },
    { role: "user", content: "Mensaje 4" },
    { role: "user", content: "Mensaje 5" },
    { role: "user", content: "Mensaje 6" },
    { role: "user", content: "Mensaje 7" },
    { role: "user", content: "Mensaje 8" },
    { role: "user", content: "Mensaje 9" },
    { role: "user", content: "Mensaje 10" }
  ];

  const result = limitHistory(history);

  expect(result).toHaveLength(8);

  expect(result[0].content).toBe("Mensaje 3");

  expect(result[7].content).toBe("Mensaje 10");

});