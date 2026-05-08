export async function loadDemoData() {
  const res = await fetch('/demo.json')
  return await res.json()
}
