export const applyMask = {
  cpf: (doc: string): string =>
    doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
  cnpj: (doc: string): string =>
    doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"),
};
