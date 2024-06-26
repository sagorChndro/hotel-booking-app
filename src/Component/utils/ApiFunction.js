import axios from "axios";

export const api =axios.create({
    baseURL:"http://localhost:5050"
});


export const getHeader = ()=>{
    const token = localStorage.getItem("token");
    return{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
    }
}

/* This function adds a new room to database  */
export async function addRoom(photo, roomType, roomPrice){
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/room/add/new-room", formData);
    if(response.status === 201){
        return true;
    }else{
        return false;
    }
}

/* This function gets all room types from the database  */
export async function getRoomTypes(){
    try {
        const response = await api.get("/room/roomTypes")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types");
    }
}

// This function gets all rooms from the database
export async function getAllRooms(){
    try {
        const result = await api.get("/room/getAllRooms")
        return result.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

// This function deletes a room by id
export async function deleteRoom(roomId){
    try {
        const result = await api.delete(`/room/deleteRoom/${roomId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`);
    }
}

// This function update a room
export async function updateRoom(roomId, roomData){
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);
    const response = await api.put(`/room/update/${roomId}`, formData)
    return response;

}

// This function gets a room by id
export async function getRoomById(roomId){
    try {
        const result = await api.get(`/room/getRoom/${roomId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`);
    }
}

// This function saves a new booking to the database
export async function bookRoom(roomId, booking){
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking` ,booking);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }else{
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}


// This function get all bookings from the database
export async function getAllBookings(){
    try {
        const result = await api.get("/bookings/all-bookings");
        return result;
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`);
    }
}

// This function get booking by the confirmation code
export async function getBookingByConfirmationCode(confirmationCode){
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return result.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }else{
            throw new Error(`Error finding booking : ${error.message}`);
        }
    }
}

// This function cancels booking
export async function cancelBooking(bookingId){
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
        return result.data;
    } catch (error) {
        throw new Error(`Error canceling booking : ${error.message}`);
    }
}

// This function gets all available rooms from the database with a given date and room type
// export async function getAvailableRooms(checkInDate, checkOutDate,roomType){
//     const result = await api.get(`/room/available-rooms?checkInDate${checkInDate}&checkOutDate${checkOutDate}&roomType${roomType}`)
//     return result;
// }

// This function gets all available rooms from the database with a given date and room type
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(`/room/available-rooms`, {
      params: {
        checkInDate,
        checkOutDate,
        roomType,
      },
    });
    return result;
  }


  export async function registerUser(registration){
    try {
        const response = await api.post("/auth/register-user", registration);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }else{
            throw new Error(`User registration error : ${error.message}`);
        }
    }
  }

// export async function registerUser(registration) {
//     try {
//       const response = await axios.post("/auth/register-user", registration, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.data) {
//         throw new Error(error.response.data);
//       } else {
//         throw new Error(`User registration error: ${error.message}`);
//       }
//     }
//   }
  

  export async function loginUser(login){
    try {
        const response = await api.post("/auth/userLogin", login);
        if(response.status >= 200 && response.status <300){
            return response.data;
        }else{
            return null;
        }     
    } catch (error) {
        console.error(error);
        return null;
    }
  }


  export async function getUserProfile(userId, token){
    try {
        const response = await api.post(`/users/profile/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
  }


  export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}