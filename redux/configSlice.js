import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    country: 'US',
    adult: false,
}

export const configSlice = createSlice({
        name: "config",
        initialState,
        reducers: {
            updatePreference(state, action){
                //Get key and value given,
                const key = action.payload.key
                const newValue = action.payload.newValue

                switch (key){
                    case "country":
                        state.country = newValue
                        break

                    case "adult":
                        state.adult = newValue
                        break

                    default:
                        break
                }

            }
        },
 
    }
)

export const { updatePreference } = configSlice.actions


export default configSlice.reducer