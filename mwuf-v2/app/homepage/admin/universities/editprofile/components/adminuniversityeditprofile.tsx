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

//Component imports
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

const AdminUniversityEditProfileForm: React.FC = () => {
    const {navigate} = useNavigation();
    const searchParams = useSearchParams();
    const universityEmail = searchParams.get('email')
    const adminUsername = searchParams.get('username')

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

    return (
        null
    )
}