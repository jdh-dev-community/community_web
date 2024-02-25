export const onRemoveHtmlTag = (input: string) => {
  var objStrip = new RegExp(/<[a-zA-Z\/][^>]*>/gi);
  return input.replace(objStrip, "");
};
