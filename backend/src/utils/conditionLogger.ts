export const conditionLogger = ({
  condition,
  messages,
}: {
  condition: boolean;
  messages: any[];
}) => {
  if (condition) console.log(...messages);
};
