import './App.css';
import Account from './account/App';
import Body from './body/App';
import { useMediaQuery } from 'react-responsive'


export default function Home() {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    return (
      <div className='home'>
        <Body/>
        {isDesktopOrLaptop && <Account/>}
      </div>
    );
  }