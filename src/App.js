import logo from './logo.svg';
import './App.css';
import AddRoom from './Component/Room/AddRoom';
import ExistingRoom from './Component/Room/ExistingRoom';
import RoomTypeSelector from './Component/common/RoomTypeSelector';
import RoomFilter from './Component/common/RoomFilter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import HomePage from './Component/home/HomePage';
import EditRoom from './Component/Room/EditRoom';
import Navbar from './Component/layout/Navbar';
import Footer from './Component/layout/Footer';
import RoomListing from './Component/Room/RoomListing';
import Admin from './Component/admin/Admin';
import Ceckingout from './Component/bookings/Ceckingout';
import BookingSuccess from './Component/bookings/BookingSuccess';
import Bookings from './Component/bookings/Bookings';
import FindBooking from './Component/bookings/FindBooking';
import Profile from './Component/auth/Profile';
import Registration from './Component/auth/Registration';
import Login from './Component/auth/Login';
import { AuthProvider } from './Component/auth/AuthProvider';
import RequireAuth from './Component/auth/RequireAuth';


function App() {
  return (
    // <>
    //   <main>
    //     <Router>
    //       <Navbar/>
    //       <Routes>
    //         <Route path='/' element={<HomePage />} />
    //         <Route path='/edit-room/:roomId' element={<EditRoom />} />
    //         <Route path='/existing-rooms' element={<ExistingRoom />} />
    //         <Route path='/add-room' element={<AddRoom/>}/>
    //         <Route path='/book-room/:roomId' element={<Ceckingout />}/>
    //         <Route path="/browse-all-rooms" element={<RoomListing/>}/>
    //         <Route path="/admin" element={<Admin/>}/>
    //         <Route path="/booking-success" element={<BookingSuccess/>}/>
    //         <Route path="/existing-bookings" element={<Bookings/>}/>
    //         <Route path="/find-booking" element={<FindBooking/>}/>
    //       </Routes>
    //     </Router>
    //     <Footer/>
    //   </main>
    // </>
    <AuthProvider>
			<main>
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/edit-room/:roomId" element={<EditRoom />} />
						<Route path="/existing-rooms" element={<ExistingRoom />} />
						<Route path="/add-room" element={<AddRoom />} />

						<Route
							path="/book-room/:roomId"
							element={
								<RequireAuth>
									<Ceckingout />
								</RequireAuth>
							}
						/>
						<Route path="/browse-all-rooms" element={<RoomListing />} />

						<Route path="/admin" element={<Admin />} />
						<Route path="/booking-success" element={<BookingSuccess />} />
						<Route path="/existing-bookings" element={<Bookings />} />
						<Route path="/find-booking" element={<FindBooking />} />

						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />

						<Route path="/profile" element={<Profile />} />
						<Route path="/logout" element={<HomePage />} />
					</Routes>
				</Router>
				<Footer />
			</main>
		</AuthProvider>
  );
}



export default App;
