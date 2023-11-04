import { withLazy } from 'app/hoks/with-lazy'
export { homeApi } from 'features/home/store/api/home.api'

export const Home = withLazy(() => import('features/home/pages/home/home'))
