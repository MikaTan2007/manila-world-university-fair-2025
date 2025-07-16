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

    //Email from prev sign up page
    const [userEmail, setUserEmail] = useState(email);

    useEffect(() => {
        if (email) {
            setUserEmail(email);
        }
    }, [email]);

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

    const [hasError, setHasError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("original email: ", email)
        console.log("user email: ", userEmail)

        if (emptyUniName == true || uniName == "") {
            setEmptyUniName(true);
            setHasError(true);
        }

        if (emptyRegion == true) {
            setHasError(true);
        }

        if (emptyUniCountry == true) {
            setHasError(true);
        }

        const cityValues = cityInputs
            .map(input => input.value)
            .filter(value => value !== "");
        
        if (cityValues.length === 0) {
            setHasError(true);
        }

        if (emptyRepFirstName == true || repFirstName == "") {
            setEmptyRepFirstName(true);
            setHasError(true);
        }

        if (emptyRepLastName == true || repLastName == "") {
            setEmptyRepLastName(true);
            setHasError(true);
        }

        console.log(cityValues)
        console.log(cityValues.length)

        if (hasError == true) {
            return;
        }
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
                            
                            <Input id = "email" type="email" placeholder="contactme@email.com" required></Input>
                        </div>
                    </div>

                    <div className = "text-sm flex animate-pulse">
                            {hasError && <CircleX color = "red" className = "size-5"></CircleX>}
                            {hasError && <p className = "text-red-600 ml-1">All fields are required</p>}
                    </div>
                    
                    <Button type = "submit" onClick = {handleSubmit} variant = "ghost" className = "w-full text-white bg-blue-400">
                        Proceed
                    </Button>
                    <Button type = "submit" variant = "ghost" className = "w-full text-white bg-red-400">
                        Back
                    </Button>

                    <CardFooter className = "flex justify-center text-sm">
                        <Button variant = "link">Already have an account? Login here</Button>
                    </CardFooter>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default UniversitySignUpForm