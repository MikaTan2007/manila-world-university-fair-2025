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


const UniversitySignUpForm: React.FC = () => {
    const [cityInputs, setCityInputs] = useState([{id:1}]);

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
                            <Input id = "uni_name" type="text" placeholder="University Name" required></Input>
                        </div>
                        <div className = "flex">
                            <UniRegion></UniRegion>
                        </div>
                        <div className = "flex">
                            <UniCountry></UniCountry>
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
                                variant="ghost"
                                onClick={addCityInput}
                                className="w-full"
                            >
                                Add City
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
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
                    <Button type = "submit" variant = "ghost" className = "w-full text-white bg-blue-400">
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