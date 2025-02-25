import ProfilePageDefault from './ProfilePageDefault'
import ProfilePageList from './ProfilePageList'
import ProfilePageMail from './ProfilePageMail'

export default function ProfilePageIndex({ index }: { index: number }) {
  switch (index) {
    case 1:
      return <ProfilePageDefault />
      break
    case 2:
      return <ProfilePageMail />
      break
    case 3:
      return <ProfilePageList />
      break
  }
}
