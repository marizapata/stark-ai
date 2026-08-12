/* ==========================
   VALIDAR MENSAJE
========================== */

export function isValidMessage(message) {

  return typeof message === "string" && message.trim().length > 0;

}


/* ==========================
   CREAR MENSAJE
========================== */

export function createMessage(role, content) {

  return {
    role,
    content
  };

}


/* ==========================
   LIMITAR HISTORIAL
========================== */

export function limitHistory(history, limit = 8) {

  return history.slice(-limit);

}