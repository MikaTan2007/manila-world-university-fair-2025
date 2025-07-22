//React
import { SetStateAction, useState, useEffect} from "react";
import { useRouter } from "next/navigation";

//Shadcn
import { Card, 
        CardHeader, 
        CardTitle, 
        CardDescription, 
        CardContent, 
        CardFooter} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//Components
import { UniCountry } from "./unicountry-select";
import { UniRegion } from "./uniregion";
import { CircleX } from "lucide-react";
import { set } from "mongoose";



const UniversitySignUpForm: React.FC = () => {
    //Initialization of Router
    const router = useRouter();
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get('email') || '';
    const password = searchParams.get('password')

    //Email from prev sign up page
    const [userEmail, setUserEmail] = useState(email);

    //Password from prev sign up page
    const [userPassword, setUserPassword] = useState(password)

    useEffect(() => {
        if (email) {
            setUserEmail(email);
        }

        if (password) {
            setUserPassword(password);
        }
    }, [email, password]);

    interface CityInput {
        id: number;
        value: string;
    }

    //Name
    const [uniName, setUniName] = useState("");
    const [emptyUniName, setEmptyUniName] = useState(true);

    //City
    const [cityInputs, setCityInputs] = useState<CityInput[]>([{ id: 1, value: "" }]);

    //Region
    const [uniRegion, setUniRegion] = useState<string[]>([]);
    const [emptyRegion, setEmptyRegion] = useState(true);

    //Country
    const [uniCountry, setUniCountry] = useState<string[]>([]);
    const [emptyUniCountry, setEmptyUniCountry] = useState(true);

    //Representative Name
    const [repFirstName, setRepFirstName] = useState("");
    const [emptyRepFirstName, setEmptyRepFirstName] = useState(true);

    const [repLastName, setRepLastName] = useState("");
    const [emptyRepLastName, setEmptyRepLastName] = useState(true);

    //Contact Email
    const [contactEmail, setContactEmail] = useState("");
    const [emptyContactEmail, setEmptyContactEmail] = useState(true);

    //Contact Email handler
    const handleContactEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContactEmail(e.target.value)
        setEmptyContactEmail(false);
        setHasError(false);
    }

    //Uni Name Handler
    const handleUniNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUniName(e.target.value);
        setEmptyUniName(false);
        setHasError(false);
    }

    //Rep Name Handlers
    const handleRepFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepFirstName(e.target.value);    
        setEmptyRepFirstName(false);
        setHasError(false);
    }

    const handleRepLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepLastName(e.target.value);
        setEmptyRepLastName(false);
        setHasError(false);
    }

    //City Input Handler
    const handleCityChange = (id: number, value: string) => {
        setCityInputs(prevInputs =>
            prevInputs.map(input =>
                input.id === id ? {...input, value} : input
            )
        )
        setHasError(false)
    }
    
    //City Handler
    const addCityInput = () => {
        setCityInputs((prevInputs) => [
            ...prevInputs,
            {id:prevInputs.length + 1, value: ""}
        ]);
    };

    const removeCityInput = () => {
        setCityInputs((prevInputs) => {
            const updatedInputs = [...prevInputs];
            updatedInputs.pop();
            return updatedInputs;
        });
    };

    const [hasError, setHasError] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;

        //Value Error Checking
        if (emptyUniName == true || uniName == "") {
            setEmptyUniName(true);
            hasError = true;
        }

        if (emptyRegion == true) {
            hasError = true;
        }

        if (emptyUniCountry == true) {
            hasError = true;
        }

        const cityValues = cityInputs
            .map(input => input.value)
            .filter(value => value !== "");
        
        if (cityValues.length === 0) {
            hasError = true;
        }

        if (emptyRepFirstName == true || repFirstName == "") {
            setEmptyRepFirstName(true);
            hasError = true;
        }

        if (emptyRepLastName == true || repLastName == "") {
            setEmptyRepLastName(true);
            hasError = true;
        }

        if (emptyContactEmail == true || contactEmail == "") {
            setEmptyContactEmail(true);
            hasError = true;
        }

        setHasError(hasError);

        if (hasError == true) {
            return;
        }

        try {
            const universityData = {
                email: userEmail,
                password: userPassword,
                uni_name: uniName,
                region: uniRegion,
                countries: uniCountry,
                cities: cityValues,
                rep_first_name: repFirstName,
                rep_last_name: repLastName,
                rep_contact_email: contactEmail
            }
            
            const response = await fetch("/api/signup/universities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(universityData),
            });

            if (response.ok) {
                alert("University created successfully")
            } else {
                router.push("/error")
            }
        } catch (error) {
            router.push("/error")
        }

    }

    const goBack = async (e: React.FormEvent) => {
        e.preventDefault();
        router.back()
    }

    return(
        <Card className = "mx-auto max-w-sm">
            <CardHeader className = "space-y-1">
                <CardTitle className = "text-2xl font-bold flex justify-center">
                    University Information
                </CardTitle>
                <CardDescription className = "flex justify-center text-center">To get the best experience, please fill out the following fields</CardDescription>
            </CardHeader>
            <CardContent>
                <div className = "space-y-4">
                    <div className = "space-y-2">
                        <Label htmlFor="general_information">
                            University Information
                        </Label>
                        <div className = "flex">
                            <Input 
                                id = "uni_name" 
                                type="text" 
                                placeholder="University Name" 
                                required
                                onChange = {handleUniNameChange}
                                value = {uniName}
                            >
                            </Input>
                        </div>
                        <div className = "flex">
                            <UniRegion
                                uniRegion={uniRegion}
                                setUniRegion={(values) => {
                                    setUniRegion(values)
                                    setHasError(false);
                                }}
                                onUniRegionChange={setEmptyRegion}
                            ></UniRegion>
                        </div>
                        <div className = "flex">
                            <UniCountry
                                uniCountry={uniCountry}
                                setUniCountry={(values) => {
                                    setUniCountry(values)
                                    setHasError(false);
                                }}
                                onUniCountryChange={setEmptyUniCountry}
                            ></UniCountry>
                        </div>
                        {cityInputs.map((input) => (
                            <div key={input.id}>
                                <Input
                                    id={`city_name_${input.id}`}
                                    type="text"
                                    placeholder="City"
                                    required
                                    value={input.value}
                                    onChange={(e) => handleCityChange(input.id, e.target.value)}
                                />
                            </div>
                        ))}
                        <div className = "flex">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addCityInput}
                                className="w-full"
                            >
                                Add City
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={removeCityInput}
                                className="w-full"
                            >
                                Remove City
                            </Button>
                        </div>
                    </div>
                    <div className = "space-y-2">
                        <Label htmlFor="general_information">
                            Representative Information
                        </Label>
                        <div className = "flex">
                            <Input 
                                id = "rep_first_name" 
                                type="text" 
                                placeholder="First Name" 
                                required
                                onChange = {handleRepFirstName}
                                value = {repFirstName}
                            > 
                            </Input>
                            <Input 
                                id = "rep_last_name" 
                                type="text" 
                                placeholder="Last Name" 
                                required
                                onChange = {handleRepLastName}
                                value = {repLastName}
                            >
                            </Input>
                        </div>
                    </div>
                    <div className = "space-y-2">
                        <Label htmlFor="general_information">
                            Contact Email
                        </Label>
                        <div className = "flex">
                            <Input 
                                id = "email" 
                                type="email" 
                                placeholder="contactme@email.com" 
                                required
                                onChange={handleContactEmailChange}
                                value = {contactEmail}
                            >
                            </Input>
                        </div>
                    </div>

                    <div className = "text-sm flex animate-pulse">
                            {hasError && <CircleX color = "red" className = "size-5"></CircleX>}
                            {hasError && <p className = "text-red-600 ml-1">All fields are required</p>}
                    </div>
                    
                    <Button type = "submit" onClick = {handleSubmit} variant = "ghost" className = "w-full text-white bg-blue-400">
                        Proceed
                    </Button>
                    <Button type = "submit" onClick = {goBack} variant = "ghost" className = "w-full text-white bg-red-400">
                        Back
                    </Button>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default UniversitySignUpForm