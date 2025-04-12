// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// interface ProfileProps {
//     id: number,
//     name: string,
//     email: string,
//     role: string
// }



// const Profile = () => {
//     const [profile, setProfile] = useState<ProfileProps[]>([]);

//     const token = localStorage.getItem("token");
//     if (!token) {
//         return;
//     }
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     },

//                 });
//                 setProfile(response.data);
//             } catch (error) {
//                 console.log("Error while getting your details", error);
//             }
//         }

//         fetchProfile();
//     },[]);
    
    
//     return (
//         <div>

//         </div>
//     )
// }

// export default Profile