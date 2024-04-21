
interface NotificationMessageType {
  to: string | string[];
  sound: string;
  title: string;
  body: string;
  data: { someData: string };
}


export async function sendPushNotification(content: NotificationMessageType) {
  const message = {
    to: content.to,
    sound: content.sound,
    title: content.title,
    body: content.body,
    data: content.data,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}