//React or Next
import { useState, useEffect} from "react";
import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/hooks/useNavigation";

import toast from "react-hot-toast";

//Shadcn
import { Card, 
        CardHeader, 
        CardTitle, 
        CardContent, 
        } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//Component Imports
import { UniCountry } from "@/app/signup/university/components/unicountry-select";
import { UniRegion } from "@/app/signup/university/components/uniregion";
import { HomepageSkeletonLoad } from "@/app/homepage/cardSkeletonLoad";
import { CircleX, Eraser } from "lucide-react";

interface University {
    email: string;
    uni_name: string;
    region: string[];
    countries: string[];
    cities: string[];
    rep_first_name: string;
    rep_last_name: string;
    rep_contact_email: string;
    registered_students: string[];
}

interface CityInput {
    id: number;
    value: string;
}

const UniversityEditProfileForm: React.FC = () => {
    const {navigate} = useNavigation();
    const searchParams = useSearchParams();
    const universityEmail = searchParams.get('email');

    const [university, setUniversity] = useState<University>();
    const [loading, setLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState(false);
    const [anyChanges, setAnyChanges] = useState(false);
    const [takenEmail, setTakenEmail] = useState(false);

    //University Attributes
    const [newEmail, setNewEmail] = useState("");
    const [uniName, setUniName] = useState("");
    const [uniRegion, setUniRegion] = useState<string[]>([]);
    const [uniCountries, setUniCountries] = useState<string[]>([]);
    const [cities, setCities] = useState<CityInput[]>([{ id: 1, value: "" }]);
    const [repFirstName, setRepFirstName] = useState("");
    const [repLastName, setRepLastName] = useState("");
    const [repContactEmail, setRepContactEmail] = useState("");

    //Determining changed
    const [uniNameChanged, setUniNameChanged] = useState(false);
    const [regionsChanged, setRegionsChanged] = useState(false);
    const [countriesChanged, setCountriesChanged] = useState(false);
    const [citiesChanged, setCitiesChanged] = useState(false);
    const [repFirstNameChanged, setRepFirstNameChanged] = useState(false);
    const [repLastNameChanged, setRepLastNameChanged] = useState(false);
    const [repContactEmailChanged, setRepContactEmailChanged] = useState(false);

    //Variable Handlers
    const handleUniNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUniName(e.target.value);
        setUniNameChanged(true);
        setAnyChanges(true);
        setHasError(false);
    }

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepFirstName(e.target.value);
        setRepFirstNameChanged(true);
        setAnyChanges(true);
        setHasError(false);
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepLastName(e.target.value);
        setRepLastNameChanged(true);
        setAnyChanges(true);
        setHasError(false);
    }

    const handleContactEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepContactEmail(e.target.value);
        setRepContactEmailChanged(true);
        setAnyChanges(true);
        setHasError(false);
    }

    const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
        setTakenEmail(false);
        setAnyChanges(true);
        setHasError(false);
    }

    //City Input Handler
    const handleCityChange = (id: number, value: string) => {
        setCities(prevInputs =>
            prevInputs.map(input =>
                input.id === id ? {...input, value} : input
            )
        )
        setHasError(false)
    }
    
    //City Handler
    const addCityInput = () => {
        setCities((prevInputs) => [
            ...prevInputs,
            {id:prevInputs.length + 1, value: ""}
        ]);
    };

    const removeCityInput = (id?: number) => {
        setCities((prevInputs) => {
            if (id) {
                return prevInputs.filter(input => input.id !== id);
            } else {
                const updatedInputs = [...prevInputs];
                updatedInputs.pop();
                return updatedInputs;
            }
        });
    };

    const clearNewEmail = () => {
        setNewEmail("");
        setTakenEmail(false);
    }

    const clearContactEmail = () => {
        setRepContactEmail("");
    }

    const fetchUniversityData = async () => {
        try {
            const response = await fetch("/api/homepage/universities/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: universityEmail
                })
            })

            if (response.status === 401 || response.status === 403) {
                navigate("/error/forbidden");
                return;
            }

            if (response.ok != true) {
                navigate("/error");
                return;
            }

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const universityData = data.university;
                    setUniversity(universityData);
                    
                    setUniName(universityData.uni_name || "");
                    setNewEmail(universityData.email || "");
                    setUniRegion(universityData.region || []);
                    setUniCountries(universityData.countries || []);
                    
                    const cityInputs = universityData.cities && universityData.cities.length > 0 
                    ? universityData.cities.map((city: string, index: number) => ({
                        id: index + 1,
                        value: city
                    }))
                    : [{ id: 1, value: "" }];

                    setCities(cityInputs);
                    
                    setRepFirstName(universityData.rep_first_name || "");
                    setRepLastName(universityData.rep_last_name || "");
                    setRepContactEmail(universityData.rep_contact_email || "");
                }
            }

        } catch (error) {
            navigate("/error");
            return;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (universityEmail=="") {
            navigate("/error/forbidden");
            return;
        }
        
        fetchUniversityData();

        
    }, [universityEmail]);

    if (loading == true) {
        return (
            <div className = "mx-auto max-w-sm">
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
            </div>
        )
    }

    //Button Handlers
    const handleBack = async() => {
        if (anyChanges == true) {
            toast((t) => (
                <div className="flex flex-col gap-2">
                    <p className="font-bold flex justify-center">Unsaved Changes</p>
                    <p className="text-sm items-center text-gray-600">
                         Are you sure you want to leave?
                    </p>
                    <div className="flex justify-center gap-2">
                        <Button
                            className="px-3 py-1 text-green-600 rounded text-sm"
                            onClick={() => toast.dismiss(t.id)}
                            variant = "outline"
                        >
                            Stay
                        </Button>

                        <Button
                            className="px-3 py-1 text-red-600 rounded text-sm"
                            onClick={() => {
                                toast.dismiss(t.id);
                                navigate(`/homepage/university/profile?email=${encodeURIComponent(universityEmail ?? "")}&firstName=${repFirstName}`);
                            }}
                            variant = "outline"
                        >
                            Leave
                        </Button>
                        
                    </div>
                </div>
            ), {
                duration: Infinity, 
            });
            return;
        }
        navigate(`/homepage/university/profile?email=${encodeURIComponent(universityEmail ?? "")}&firstName=${repFirstName}`);
        return;
    }

    const handleProfileSubmit = async() => {
        let hasError = false;

        if (repContactEmail == "" || repFirstName == "" || repLastName == "" || newEmail == "" || uniName == "" || uniRegion.length == 0 || cities.length == 0 || uniCountries.length == 0 || takenEmail == true) {
            hasError = true;
        }

        if (hasError == true) {
            setHasError(true);
            return;
        }

        const toastId = toast.loading("Processing...")

        //If no email change
        if (universityEmail == newEmail) {
            const universityData: any = {
                email: universityEmail
            };

            if (uniNameChanged) {
                universityData.uni_name = uniName;
            }
            if (regionsChanged) {
                universityData.region = uniRegion;
            }
            if (countriesChanged) {
                universityData.countries = uniCountries;
            }
            if (citiesChanged) {
                universityData.cities = cities.map(city => city.value);
            }
            if (repFirstNameChanged) {
                universityData.rep_first_name = repFirstName;
            }
            if (repLastNameChanged) {
                universityData.rep_last_name = repLastName;
            }
            if (repContactEmailChanged) {
                universityData.rep_contact_email = repContactEmail;
            }

            try {
                const response = await fetch("/api/homepage/universities/profile/editprofile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(universityData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    toast.dismiss(toastId)
                    toast.success("Profile updated")
                    navigate(`/homepage/university/profile?email=${encodeURIComponent(universityEmail ?? "")}&firstName=${repFirstName}`);
                } else {
                    toast.dismiss(toastId);
                    navigate("/error")
                }

            } catch {
                toast.dismiss(toastId);
                navigate("/error")
            }
        } else {
            const universityData: any = {
                email: universityEmail,
                new_email: newEmail
            }; 

            if (uniNameChanged) {
                universityData.uni_name = uniName;
            }
            if (regionsChanged) {
                universityData.region = uniRegion;
            }
            if (countriesChanged) {
                universityData.countries = uniCountries;
            }
            if (citiesChanged) {
                universityData.cities = cities.map(city => city.value);
            }
            if (repFirstNameChanged) {
                universityData.rep_first_name = repFirstName;
            }
            if (repLastNameChanged) {
                universityData.rep_last_name = repLastName;
            }
            if (repContactEmailChanged) {
                universityData.rep_contact_email = repContactEmail;
            }

            try {
                const response = await fetch("/api/homepage/universities/profile/editprofile/new_email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(universityData)
                });

                if (response.status === 401 || response.status === 403 ) {
                    navigate("/error/forbidden");
                    return;
                }

                if (response.status === 409) {
                    setNewEmail("Email has already been taken")
                    setTakenEmail(true);
                    toast.dismiss();
                    return;
                }

                if (!response.ok) {
                    navigate("/error")
                    return;
                }

                if (response.status === 200) {
                    toast.success("Profile updated")
                    navigate(`/homepage/university/profile?email=${encodeURIComponent(newEmail ?? "")}&firstName=${repFirstName}`);
                    return;
                }

            } catch {
                toast.dismiss(toastId);
                navigate("/error")
            }
        }

    }

    return (
        <Card className = "mx-auto max-w-sm">
            <CardHeader className = "space-y-1">
                <CardTitle className = "text-2xl font-bold flex justify-center">
                    Edit Profile
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="uni_name">
                            University Name
                        </Label>
                        <div className = "flex">
                        
                            <Input 
                                id = "university_name" 
                                type="text" 
                                placeholder="University Name" 
                                onChange = {handleUniNameChange}
                                value = {uniName}
                                >
                            </Input> 

                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="uni_region">
                            University Region
                        </Label>
                        <div className = "flex">
                        
                            <UniRegion
                                uniRegion={uniRegion}
                                setUniRegion={(values) => {
                                    setUniRegion(values)
                                    setHasError(false);
                                }}
                                onUniRegionChange={()=> {
                                    setRegionsChanged(true);
                                    setAnyChanges(true);
                                }}
                            ></UniRegion>

                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="uni_region">
                            University Country
                        </Label>
                        <div className = "flex">
                        
                            <UniCountry
                                uniCountry={uniCountries}
                                setUniCountry={(values) => {
                                    setUniCountries(values)
                                    setHasError(false);
                                }}
                                onUniCountryChange={()=> {
                                    setCountriesChanged(true);
                                    setAnyChanges(true);
                                }}
                            ></UniCountry>

                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="uni_cities">
                            University Cities
                        </Label>
                        
                        
                        <div className="space-y-2">
                            {cities.map((input, index) => (
                                <div key={input.id} className="flex items-center gap-2">
                                    <Input
                                        id={`city_name_${input.id}`}
                                        type="text"
                                        placeholder={`City ${index + 1}`}
                                        required
                                        value={input.value}
                                        onChange={(e) => {
                                            handleCityChange(input.id, e.target.value);
                                            setCitiesChanged(true);
                                            setAnyChanges(true);
                                        }}
                                        className="flex-1"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    addCityInput();
                                }}
                                className="flex-1"
                            >
                                Add City
                            </Button>
                            {cities.length > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        removeCityInput();
                                        setCitiesChanged(true);
                                        setAnyChanges(true);
                                    }}
                                    className="flex-1"
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="rep_name">
                            Representative Name
                        </Label>
                        <div className = "flex">
                        
                            <Input 
                                id = "first_name" 
                                type="text" 
                                placeholder="First Name" 
                                onChange = {handleFirstNameChange}
                                value = {repFirstName}
                                >
                            </Input> 

                            <Input 
                                id = "last_name" 
                                type="text" 
                                placeholder="Last Name" 
                                onChange = {handleLastNameChange}
                                value = {repLastName}
                                >
                            </Input> 

                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact_email">
                            Contact Email
                        </Label>
                        <div className = "flex">
                            <Input 
                                id = "email" 
                                type="email" 
                                placeholder="contactme@email.com" 
                                required
                                onChange={handleContactEmailChange}
                                value = {repContactEmail}
                            >
                            </Input>
                            <Button onClick = {clearContactEmail} variant = "ghost" size = "icon">
                                <Eraser></Eraser>
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="account_email">
                            Account Email
                        </Label>
                        
                        <div className = "flex">
                            {takenEmail ?
                                <Input 
                                    id = "email" 
                                    type="email" 
                                    placeholder="contactme@email.com" 
                                    required
                                    onChange={handleNewEmailChange}
                                    value = {newEmail}
                                    className="text-red-600"
                                >
                                </Input>
                                :
                                <Input 
                                    id = "email" 
                                    type="email" 
                                    placeholder="contactme@email.com" 
                                    required
                                    onChange={handleNewEmailChange}
                                    value = {newEmail}
                                >
                                </Input>
                            }
                            <Button onClick = {clearNewEmail} variant = "ghost" size = "icon">
                                <Eraser></Eraser>
                            </Button>
                        </div>
                        
                    </div>
                    
                    <div className = "text-sm flex animate-pulse">
                        {hasError && <CircleX color = "red" className = "size-5"></CircleX>}
                        {hasError && <p className = "text-red-600 ml-1">All fields are required</p>}
                    </div>
                    <Button type = "submit" disabled = {!anyChanges} onClick={handleProfileSubmit} variant = "ghost" className = "w-full text-white bg-blue-400">
                        Save Changes
                    </Button>
                    <Button type = "submit" onClick={handleBack} variant = "ghost" className = "w-full text-white bg-red-400">
                        Back
                    </Button>

                </div>
            </CardContent>
        </Card>
    )
}

export default UniversityEditProfileForm;