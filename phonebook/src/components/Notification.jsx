const Notification = ({ message, messageType }) => {
  if (message === null) return null;

  const className = `notification ${messageType || ""}`.trim();

  return <div className={className}>{message}</div>;
};

export default Notification;
