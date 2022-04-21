import { StyleSheet, Text, View, Button, Dimensions, TextInput, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import User from '../database/user';
import { getAuth } from 'firebase/auth';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



function ExerciseRoutines() {
    const workoutPressHandler = (name, routineName) => {
        setRoutines((prevRoutines) => {
            const tempRoutineIndex = prevRoutines.findIndex(routine => routineName === routine.name)
            prevRoutines[tempRoutineIndex].workouts = prevRoutines[tempRoutineIndex].workouts.filter(workout => workout.name !== name)
            setEditWorkoutModal({open: false, routineName: null, workoutName: null})
            return [...prevRoutines]
        })
    }

    useEffect(async () => {
        if (!userInfo) {
            const auth = getAuth();
            const userData = await User.getUserInfo(auth.currentUser.uid); //Pulls user info from the firebase
            setUserInfo(userData);
            setRoutines(userData.workOuts);
        }
    })

    const [userInfo, setUserInfo] = useState(null);
    const [nameText, setNameText] = useState('');
    const [repText, setRepText] = useState('');
    const [setText, setSetText] = useState('');
    const [routineNameText, setRoutineNameText] = useState('');
    
    const [editNameText, setEditNameText] = useState('');
    const [editRepText, setEditRepText] = useState('');
    const [editSetText, setEditSetText] = useState('');

    const changeNameHandler = (val) => {
        setNameText(val);
    }
    const changeRepHandler = (val) => {
        setRepText(val.replace(/[^0-9]/g, ''));
    }
    const changeSetHandler = (val) => {
        setSetText(val.replace(/[^0-9]/g, ''))
    };

    const changeEditNameHandler = (val) => {
        setEditNameText(val);
    }
    const changeEditRepHandler = (val) => {
        setEditRepText(val.replace(/[^0-9]/g, ''));
    }
    const changeEditSetHandler = (val) => {
        setEditSetText(val.replace(/[^0-9]/g, ''))
    };

    const changeRoutineNameHandler = (val) => {
        setRoutineNameText(val);
    };

    const submitAddWorkoutHandler = async (name, reps, sets, routineName) => {
        // checks if fields are empty
        if (!name || !reps || !sets) {
            Alert.alert('Alert', 'Make sure there are no empty fields', [
                { text: 'Ok', onPress: () => console.log('alert close') }
            ])
        }
        else
            setRoutines((prevRoutines) => {
                const tempRoutines = [
                    ...prevRoutines,
                ]
                tempRoutines.find(routine => routine.name === routineName)?.workouts.push({ name, reps, sets })
                User.addRoutines(tempRoutines, userInfo.uid);
                changeRepHandler('')
                changeSetHandler('')
                changeNameHandler('')
                return tempRoutines;
            })
    }

    const submitEditWorkoutHandler = async (name, reps, sets, routineName, workoutName) => {
        // checks if fields are empty
        if (!name || !reps || !sets) {
            Alert.alert('Alert', 'Make sure there are no empty fields', [
                { text: 'Ok', onPress: () => console.log('alert close') }
            ])
        }
        else
            setRoutines((prevRoutines) => {
                const tempRoutines = [
                    ...prevRoutines,
                ]
                const tempWorkoutIndex = tempRoutines.find(routine => routine.name === routineName)?.workouts.find(workout => workout.name === workoutName)
                tempWorkoutIndex.name = name
                tempWorkoutIndex.reps = reps
                tempWorkoutIndex.sets = sets
                setEditWorkoutModal({open: false, routineName: null, workoutName: null})
                changeEditRepHandler('')
                changeEditSetHandler('')
                changeEditNameHandler('')
                return tempRoutines;
            })
    }

    const submitAddRoutineHandler = (routineName) => {
        if (!routineName)
            Alert.alert('Alert', 'Make sure there are no empty fields', [
                { text: 'Ok', onPress: () => console.log('alert close') }
            ])
        else
            setRoutines((prevRoutines) => {
                const tempRoutines = [
                    ...prevRoutines,
                ]
                tempRoutines.push({ name: routineName, workouts: [] })
                closeAddRoutineModal()
                return tempRoutines
            })
    }

    const [routines, setRoutines] = useState([
    ]);

    const [addWorkoutModal, setAddWorkoutModal] = useState(
        { open: false, routineName: null }
    );
    const [addRoutineModal, setAddRoutineModal] = useState(false);

    const [editWorkoutModal, setEditWorkoutModal] = useState(
        { open: false, routineName: null, workoutName: null }
    );

    const closeAddWorkoutModal = () => {
        setNameText('')
        setSetText('')
        setRepText('')
        setAddWorkoutModal({ open: false, routineName: null });
    }
    
    const closeAddRoutineModal = () => {
        setRoutineNameText('')
        setAddRoutineModal(false)
    }
    const addWorkout = (nameText, repText, setText) => {
        submitAddWorkoutHandler(nameText, repText, setText, addWorkoutModal.routineName);

    }

    const deleteRoutineHelper = (routineName) => {
        setRoutines((prevRoutines) => {
            const tempRoutine = prevRoutines.filter(routine => routineName !== routine.name)
            prevRoutines = tempRoutine
            console.log(prevRoutines)
            return [...prevRoutines]
        })
        User.removeRoutines(routineName, userInfo.uid);
    }

    const deleteRoutine = (routineName) => {
        deleteRoutineHelper(routineName)
        closeAddWorkoutModal()
    }

    const addRoutine = (routineName) => {
        submitAddRoutineHandler(routineName)
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#96BDC6', flex: 1 }}>

                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <Button title='add routine' onPress={() => setAddRoutineModal(true)} />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Routines</Text>
                    </View>



                    <Modal visible={addRoutineModal}>
                        <View style={styles.container}>
                            <Text style={{ fontSize: 36, padding: 10 }}>Add Routine</Text>
                            <TextInput
                                style={styles.inputContainer}
                                placeholder='routine name'
                                onChangeText={changeRoutineNameHandler}
                            />
                            <Button title='exit' onPress={() => setAddRoutineModal(false)} />
                            <Button title='add routine' onPress={() => addRoutine(routineNameText)} />
                        </View>
                    </Modal>

                    <Modal visible={addWorkoutModal.open}>
                        <View style={styles.container}>

                            <Modal visible={editWorkoutModal.open}>
                                <View style={styles.container}>
                                    <Text style={{ marginTop: 50, fontSize: 28, textAlign: 'center' }}>Edit Workout</Text>
                                    <View style={{ padding: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <TextInput
                                            style={styles.inputContainer}
                                            placeholder='workout name'
                                            onChangeText={changeEditNameHandler}
                                        />
                                        <TextInput
                                            style={styles.inputContainer}
                                            placeholder='rep number'
                                            keyBoardType='numeric'
                                            onChangeText={changeEditRepHandler}
                                        />
                                        <TextInput
                                            style={styles.inputContainer}
                                            placeholder='set number'
                                            keyBoardType='numeric'
                                            onChangeText={changeEditSetHandler}
                                        />
                                        <Button title='exit' onPress={() => setEditWorkoutModal({ open: false, routineName: null, workoutName: null })} />
                                        <Button title='delete workout' onPress={() =>  workoutPressHandler(editWorkoutModal.workoutName, editWorkoutModal.routineName)} />
                                        <Button title='edit' onPress={() => submitEditWorkoutHandler(editNameText, editRepText, editSetText, editWorkoutModal.routineName, editWorkoutModal.workoutName)} />
                                    </View>
                                </View>
                            </Modal>

                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{addWorkoutModal.routineName}</Text>
                            </View>
                            <Text style={{ marginTop: 50, fontSize: 28, textAlign: 'center' }}>Add Workout</Text>
                            <View style={{ padding: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.inputContainer}
                                    placeholder='workout name'
                                    onChangeText={changeNameHandler}
                                    value={nameText}
                                />
                                <TextInput
                                    style={styles.inputContainer}
                                    placeholder='rep number'
                                    keyBoardType='numeric'
                                    onChangeText={changeRepHandler}
                                    value={repText}
                                />
                                <TextInput
                                    style={styles.inputContainer}
                                    placeholder='set number'
                                    keyBoardType='numeric'
                                    onChangeText={changeSetHandler}
                                    value={setText}
                                />
                                <Button title='exit' onPress={() => closeAddWorkoutModal()} />
                                <Button title='delete routine' onPress={() => deleteRoutine(addWorkoutModal.routineName)} />
                                <Button title='add workout' onPress={() => addWorkout(nameText, repText, setText)} />
                            </View>
                            <View style={{ height: 200 }}>
                                <ScrollView style={{ backgroundColor: '#E8CCBF', borderRadius: 5, borderWidth: 2, borderColor: '#000000', width: 375, marginHorizontal: 20 }}>
                                    {(routines).find(routine => routine.name === addWorkoutModal.routineName)?.workouts.map((workout) => (
                                        <View style={{ left: 3, margin: 2 }} key={workout.name}>
                                            <TouchableOpacity onPress={() => setEditWorkoutModal({ open: true, routineName: addWorkoutModal.routineName, workoutName: workout.name })}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1, marginTop: 24 }}>{workout.name}</Text>
                                                <Text style={{ fontSize: 12 }}>{workout.sets}x{workout.reps}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>



                    <View style={{ height: 200 }}>
                        {routines.map(routine =>
                            <>
                                <View style={{ paddingTop: 10 }}>
                                    <Text style={styles.routineName}>{routine.name}</Text>
                                </View>
                                <TouchableOpacity onPress={() => setAddWorkoutModal({ open: true, routineName: routine.name })}>
                                    <ScrollView style={{ backgroundColor: '#E8CCBF', borderRadius: 10, borderWidth: 2, borderColor: '#000000', width: 375, flex: 1, paddingHorizontal: 20 }}>
                                        {routine.workouts.map((item) => (
                                            <View style={{ left: 3 }} key={item.name}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1, marginTop: 24 }}>{item.name}</Text>
                                                <Text style={{ fontSize: 12 }}>{item.sets}x{item.reps}</Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#96BDC6',
        alignItems: 'center',
        paddingTop: screenHeight * 0.1,
        paddingBottom: screenHeight * 0.15,
        width: screenWidth,
        // height: screenHeight,
    },
    titleContainer: {

    },
    title: {
        fontSize: 36,
        fontWeight: 'bold'
        // right: 120,
    },
    inputContainer: {
        borderColor: '#000000',
        borderWidth: 1,
        width: 200,
        padding: 8,
        marginVertical: 10
    },
    routineName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        top: 50,
        right: 10,
    }
})
export default ExerciseRoutines;
