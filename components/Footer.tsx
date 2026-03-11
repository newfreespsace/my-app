export default function Footer() {
  const deployTime = process.env.NEXT_PUBLIC_DEPLOY_TIME;

  return <p>最近更新于: {new Date(deployTime!).toLocaleString('zh-CN')}</p>;
}
