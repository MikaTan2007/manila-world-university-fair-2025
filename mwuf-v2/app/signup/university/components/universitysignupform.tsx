//React
import { SetStateAction, useState, useEffect} from "react";

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


const UniversitySignUpForm: React.FC = () => {

    //Name
    const [uniName, setUniName] = useState("");
    const [emptyUniName, setEmptyUniName] = useState(true);

    //City
    const [cityInputs, setCityInputs] = useState([{id:1}]);

    //Region
    const [uniRegion, setUniRegion] = useState<string[]>([]);
    const [emptyRegion, setEmptyRegion] = useState(true);

    //Country
    const [uniCountry, setUniCountry] = useState<string[]>([]);
    const [emptyUniCountry, setEmptyUniCountry] = useState(true);

    //Uni Name Handler
    const handleUniNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUniName(e.target.value);
        setEmptyUniName(false);
        setHasError(false);
    }
    
    //City Handler
    const addCityInput = () => {
        setCityInputs((prevInputs) => {
            const updatedInputs = [...prevInputs];
            updatedInputs.push({ id: prevInputs.length + 1 });
            return updatedInputs;
        });
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

        if (emptyUniName == true || uniName == "") {
            setEmptyUniName(true);
            setHasError(true);
        }

        console.log(uniRegion)

        if (emptyRegion == true) {
            setHasError(true);
        }

        console.log(uniCountry)

        if (emptyUniCountry == true) {
            setHasError(true);
        }

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
                            <Input id = "rep_first_name" type="text" placeholder="First Name" required></Input>
                            <Input id = "rep_last_name" type="text" placeholder="Last Name" required></Input>
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