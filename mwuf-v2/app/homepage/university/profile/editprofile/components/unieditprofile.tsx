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
import { GenderOption } from "@/app/signup/student/components/genderoption";
import { GradYearOption } from "@/app/signup/student/components/graduation-year-select";
import { IdealMajor } from "@/app/signup/student/components/idealmajor";
import { CountrySelect } from "@/app/signup/student/components/citizenship";
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
    const [cities, setCities] = useState<string[]>([]);
    const [repFirstName, setRepFirstName] = useState("");
    const [repLastName, setRepLastName] = useState("");
    const [repContactEmail, setRepContactEmail] = useState("");

    //Determining changed
    const [uniNameChanged, setUniNameChanged] = useState(false);
    const [regionsChanged, setRegionsChanged] = useState(false);
    const [citiesChanged, setCitiesChanged] = useState(false);
    const [repFirstNameChanged, setRepFirstNameChanged] = useState(false);
    const [repLastNameChanged, setRepLastNameChanged] = useState(false);
    const [repContactEmailChanged, setRepContactEmailChanged] = useState(false);

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

    const clearEmail = () => {
        setNewEmail("");
        setTakenEmail(true);
    }

    return (
        null
    )
}

export default UniversityEditProfileForm;