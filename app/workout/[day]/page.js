import WorkoutClient from './WorkoutClient'

export function generateStaticParams() {
  return [{ day: 'A' }, { day: 'B' }, { day: 'C' }, { day: 'a' }, { day: 'b' }, { day: 'c' }]
}

export default function WorkoutPage() {
  return <WorkoutClient />
}
