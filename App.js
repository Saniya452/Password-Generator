import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as yup from "yup";
import { Formik } from "formik";

const passwordSchema = yup.object().shape({
  passwordLength: yup.number()
    .min(4, "Should be max than 4")
    .max(16, "Should be min than 16")
    .required("Lenght is required")
});

export default function App() {
  const [password, setPassword] = useState("");
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatedPasswordString = (passwordLength) => {
    let characterList = "" ;

    const upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChar = "abcdefghijklmnopqrstuvwxyz";
    const numberChar = "0123456789";
    const symbolsChar = "_#@&-!%/+`";

  if (upperCase) characterList += upperCaseChar;
  if (lowerCase) characterList += lowerCaseChar;
  if (number) characterList += numberChar;
  if (symbols) characterList += symbolsChar;

  const passwordResult = createPassword(characterList, passwordLength)
    setPassword (passwordResult)
    setIsPassGenerated (true);
 };

  const createPassword = (characters, passwordLength) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword ('');
    setIsPassGenerated (false);
    setUpperCase (false);
    setLowerCase (true);
    setNumber (false);
    setSymbols (false);

  };

  return (
    <ScrollView keyboardShouldPersistTaps= "handled"
    contentContainerStyle={styles.scrollContainer}
    >
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
              initialValues={{ passwordLength: '' }}
              validationSchema={passwordSchema}
              onSubmit={ values => {
              console.log(values);
              generatedPasswordString(+values.passwordLength); //'+' convert the string vales in numbers value
       }}
      >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (  //Errors showing method
            <Text style={styles.errorText}>
              {errors.passwordLength}
            </Text>
            )}
          </View>
          <TextInput 
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex. 4"
            keyboardType="numeric"
            />
         </View>
         <View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}> Inculde lowerCase Letters</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={lowerCase}
          onPress={() => setLowerCase(!lowerCase)}
          fillColor="#29AB87"
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}> Inculde upperCase Letters</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={upperCase}
          onPress={() => setUpperCase(!upperCase)}
          fillColor="#FED58D"
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}> Inculde Numbers</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={number}
          onPress={() => setNumber(!number)}
          fillColor="#C9A0DC"
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}> Inculde Symbols</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={symbols}
          onPress={() => setSymbols(!symbols)}
          fillColor="#FC80A5"
          />
         </View>
         </View>
         <View style={styles.formActions}>
         <TouchableOpacity 
         disabled={!isValid}
         style={styles.primaryBtn}
         onPress={handleSubmit}
         >
          <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>

         <TouchableOpacity 
          style={styles.secondaryBtn}
          onPress={ () => {
            handleReset();
            resetPassword()
          }}
         >
          <Text style={styles.secondaryBtnTxt}> Reset </Text>
         </TouchableOpacity>
         </View>
         </>
       )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flexGrow: 1, 
    backgroundColor: '#FAF3E0',
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    color: '#7D4C1B'
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    color: '#7D4C1B',
    marginBottom: 8,
  },
  heading: {
    fontSize: 16,
  },
  inputWrapper: {
    marginBottom: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#B58968',
  },
  primaryBtnTxt: {
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#D5B78D',
    justifyContent:'center',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    fontWeight: '700',
  },
  card: {
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 40,
    marginBottom: 150,
  },
  cardElevated: {
    backgroundColor: '#D5B78D',
    elevation: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 16,
    color:'#000'
  },
});
