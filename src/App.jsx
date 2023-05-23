import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import UserMenu from './components/UserMenu'
import LogIn from './components/LogIn'
import { useStateContext } from './contexts/ContextProvider'
import VerifyEmail from './pages/VerifyEmail'
import VerifyEmailBanner from './components/VerifyEmailBanner'
import axiosClient from '../axios-client'

function App() {
	const windowSize = useRef([window.innerWidth, window.innerHeight]);

	const { user, setUser } = useStateContext()

	const [frame, setFrame] = useState(determinIfSmartphone(windowSize.current));

	useEffect(() => {
		refreshUser()
	}, [])
	
	function refreshUser() {
		axiosClient.get('/api/user').then(response => {
			setUser(response.data)
		})
	}

	function toggleFrame() {
		setFrame(prev => !prev)
	}

	function determinIfSmartphone(windowSize) {
		if (windowSize[0] < 1000) {
			return false
		} else {
			return true
		}
	}

	return (
		<div className={[frame ? styles.phone : styles.phoneOff].join(' ')} >
				<div className={['pageWrap'].join(' ')} >
					<Header><UserMenu/></Header>
					<Outlet />
					<Footer></Footer>
				</div>
			{user && user.email_verified_at == null ?
				<VerifyEmailBanner></VerifyEmailBanner>
				: null
			}
			<div className={[styles.toggle].join(' ')} onClick={toggleFrame}>Toggle Frame</div>
		</div>
	)
}

export default App
