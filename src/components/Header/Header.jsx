import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userData);
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: 'About',
      slug: "/about",
      active: true
    }, 
    {
      name: 'Contact',
      slug: "/contact",
      active: authStatus,
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Publish Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-4 shadow bg-gray-500'>
      <Container>

        <nav className='flex w-full'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
              </Link>
          </div>
          <span className='flex'>Event Vibes</span>


          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-green-400 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header