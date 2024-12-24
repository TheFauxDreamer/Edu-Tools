const DEMO_DATA = {
    csv: `"CC No.","StuAddL1","StuAddL2","StuAddL3","StuAddL4","StuAddPostCode","StuAddState","StuAddTown","DOB","EMail","EntryDate","FirstName","Form","House","LegalSurname","ParAdd1L1","ParAdd1L2","ParAdd1L3","ParAdd1L4","ParAdd1PostCode","ParAdd1State","ParAdd1Town","ParAdd2L1","ParAdd2L2","ParAdd2L3","ParAdd2L4","ParAdd2PostCode","ParAdd2State","ParAdd2Town","ParEmail1","ParEmail2","ParFMM1","ParFMM2","ParFirstName1","ParFirstName2","ParMobile1","ParMobile2","ParPhone1T1","ParPhone2T1","ParResp1","ParResp2","ParSR1","ParSR2","ParSurname1","ParSurname2","ParTitle1","ParTitle2","PreferredName","Reference","Surname","StuGender","Year","ConFirstName1","ConSurname1","ConMobile1","ConPhone1T1","ConTitle1","MedCon1","MedCon1Flagged","MedCon1Notes"
"12345678","123 Smith Street","","","","6450","WA","ESPERANCE","15/05/2012","student@school.edu.au","29/01/2024","John","4A","Blue","Smith","123 Smith Street","","","","6450","WA","ESPERANCE","45 Jones Road","","","","6450","WA","ESPERANCE","parent1@email.com","parent2@email.com","YES","NO","Mary","Robert","0400111222","0400333444","","","YES","YES","YES","NO","Smith","Jones","Mrs","Mr","Johnny","ST12345","Smith","Male","4","Jane","Doe","0400555666","98765432","Mrs","**Allergic to peanuts","YES","Requires EpiPen"
"87654321","456 Brown Avenue","","","","6450","WA","ESPERANCE","22/09/2011","student2@school.edu.au","29/01/2024","Sarah","5B","Red","Brown","456 Brown Avenue","","","","6450","WA","ESPERANCE","456 Brown Avenue","","","","6450","WA","ESPERANCE","parent3@email.com","parent3@email.com","YES","YES","James","Linda","0400777888","0400777888","","","YES","YES","YES","YES","Brown","Brown","Mr","Mrs","Sarah","ST67890","Brown","Female","5","","","","","","Asthma","NO",""`,

    xml: `<?xml version="1.0" encoding="UTF-8"?>
<StudentExport>
    <Pupil>
        <StudentDetails>
            <CCNumber>12345678</CCNumber>
        </StudentDetails>
        <Contact>
            <Order>1</Order>
            <RelLnkParentNo>1</RelLnkParentNo>
            <Gender>F</Gender>
            <Relationship>Mother</Relationship>
        </Contact>
        <Contact>
            <Order>2</Order>
            <RelLnkParentNo>2</RelLnkParentNo>
            <Gender>M</Gender>
            <Relationship>Father</Relationship>
        </Contact>
    </Pupil>
    <Pupil>
        <StudentDetails>
            <CCNumber>87654321</CCNumber>
        </StudentDetails>
        <Contact>
            <Order>1</Order>
            <RelLnkParentNo>1</RelLnkParentNo>
            <Gender>M</Gender>
            <Relationship>Father</Relationship>
        </Contact>
        <Contact>
            <Order>2</Order>
            <RelLnkParentNo>2</RelLnkParentNo>
            <Gender>F</Gender>
            <Relationship>Mother</Relationship>
        </Contact>
    </Pupil>
</StudentExport>`
};
