"use client";

import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, clearUserInfo,} from '../slices/authSlice';
import { useRouter } from 'next/navigation';



const Navbar: React.FC = () => {

  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo)


  const router = useRouter();
  const AddProductHandler = () =>{
       router.push("/create-product");
  }

  const logoutHandler = async () => {
    try {
    
      const response = await fetch('http://localhost:8000/api/users/logout', {
        method: 'POST',
      
      });

      if (response.ok) {
      
        dispatch(clearUserInfo());

    
        router.push('/login');
      } else {
       
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
     
    }
  };
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto
      flex justify-between items-center
      sm:px-16 px-6 py-4">
        <Link href="/">
          <h1 className="flex justify-center items-center">
            <Image
              src="/logo.PNG"
              alt="logo"
              width={118}
              height={18}
              className="object-contain"
            />
            MechStore
          </h1>
        </Link>

        {userInfo ? (
          
        <div className="flex items-center">
         {userInfo && userInfo.isAdmin && (
          <button
          className="text-gray-800 hover:bg-gray-100 px-4 py-2"
          onClick={AddProductHandler}
          >
            Create Product
            </button>
          )}
        <span className="mr-2">{userInfo.name}</span>
        <button
          className="text-gray-800 hover:bg-gray-100 px-4 py-2"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
        ):(
        <Link href="/login">
          <p>
            <CustomButton
              title="SIGN IN"
              btnType="button"
              containerStyles="text-primary-blue
              rounded-full bg-white min-w-[130px]"
            />
          </p>
        </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
