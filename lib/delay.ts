export default async function delay(ms: number) {
  await new Promise<void>((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
