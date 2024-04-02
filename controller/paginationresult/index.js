const object_to_keys = (obj) => {
    let keys = [];
    for (let i in obj) keys.push(i);
    // for (let i in obj) keys.push(i.charAt(0).toUpperCase()+i.replaceAll("_",' ').slice(1));
    return keys;
}

const Table_title = (obj) => {
    let keys = [];
    for (let i in obj) keys.push(i.charAt(0).toUpperCase() + i.replaceAll("_", ' ').slice(1));
    return keys;
}

const query_for_entire_records = `select
student_id,
student_name,
student_surname,
CONCAT(terminal_theory, "/", terminal_theory_total) as Terminal_theory,
CONCAT(terminal_practical, "/", terminal_practical_total) as Terminal_practical,
CONCAT(prelims_theory, "/", prelims_theory_total) as Prelims_therory,
CONCAT(prelims_practical, "/", prelims_practical_total) as Prelims_practical,
CONCAT(final_theory, "/", final_theory_total) as Final_theory,
CONCAT(final_practical, "/", final_practical_total) as Final_practical,
CONCAT(total_theory, "/", total_theory_total) as Overall_theory,
CONCAT(total_practical, "/", total_practical_total) as Overall_practical,
CONCAT((total_theory + total_practical), "/", (total_theory_total + total_practical_total)) as Overall_total
FROM
(
    select
        student_id,
        student_name,
        student_surname,
        terminal_theory,
        terminal_practical,
        prelims_theory,
        prelims_practical,
        final_theory,
        final_practical,
        terminal_theory_total,
        terminal_practical_total,
        prelims_theory_total,
        prelims_practical_total,
        final_theory_total,
        final_practical_total,
        (terminal_theory + prelims_theory + final_theory) as total_theory,
        (
            terminal_practical + prelims_practical + final_practical
        ) as total_practical,
        (
            terminal_theory_total + prelims_theory_total + final_theory_total
        ) as total_theory_total,
        (
            terminal_practical_total + prelims_practical_total + final_practical_total
        ) as total_practical_total
    FROM
        (
            select
                studentMaster.student_id as student_id,
                student_name,
                student_surname,
                sum(
                    if(exam_type = "terminal", obtained_theory_marks, 0)
                ) as terminal_theory,
                sum(
                    if(
                        exam_type = "terminal",
                        obtained_practical_marks,
                        0
                    )
                ) as terminal_practical,
                sum(
                    if(exam_type = "prelims", obtained_theory_marks, 0)
                ) as prelims_theory,
                sum(
                    if(
                        exam_type = "prelims",
                        obtained_practical_marks,
                        0
                    )
                ) as prelims_practical,
                sum(
                    if(exam_type = "final", obtained_theory_marks, 0)
                ) as final_theory,
                sum(
                    if(exam_type = "final", obtained_practical_marks, 0)
                ) as final_practical,
                sum(
                    if(exam_type = "terminal", total_theory_marks, 0)
                ) as terminal_theory_total,
                sum(
                    if(exam_type = "terminal", total_practical_marks, 0)
                ) as terminal_practical_total,
                sum(if(exam_type = "prelims", total_theory_marks, 0)) as prelims_theory_total,
                sum(
                    if(exam_type = "prelims", total_practical_marks, 0)
                ) as prelims_practical_total,
                sum(if(exam_type = "final", total_theory_marks, 0)) as final_theory_total,
                sum(
                    if(exam_type = "final", total_practical_marks, 0)
                ) as final_practical_total
            FROM subjectMaster
                JOIN examMaster ON examMaster.subject_id = subjectMaster.subject_id
                JOIN studentMaster ON examMaster.student_id = studentMaster.student_id
            GROUP BY
                studentMaster.student_id
        ) AS result_view
) AS final_result_view;`;

const sql_query_for_pagination = (limitString) => {
    return `select
    student_id,
    student_name,
    student_surname,
    CONCAT(terminal_theory, "/", terminal_theory_total) as Terminal_theory,
    CONCAT(terminal_practical, "/", terminal_practical_total) as Terminal_practical,
    CONCAT(prelims_theory, "/", prelims_theory_total) as Prelims_therory,
    CONCAT(prelims_practical, "/", prelims_practical_total) as Prelims_practical,
    CONCAT(final_theory, "/", final_theory_total) as Final_theory,
    CONCAT(final_practical, "/", final_practical_total) as Final_practical,
    CONCAT(total_theory, "/", total_theory_total) as Overall_theory,
    CONCAT(total_practical, "/", total_practical_total) as Overall_practical,
    CONCAT((total_theory + total_practical), "/", (total_theory_total + total_practical_total)) as Overall_total
FROM
(
        select
            student_id,
            student_name,
            student_surname,
            terminal_theory,
            terminal_practical,
            prelims_theory,
            prelims_practical,
            final_theory,
            final_practical,
            terminal_theory_total,
            terminal_practical_total,
            prelims_theory_total,
            prelims_practical_total,
            final_theory_total,
            final_practical_total,
            (terminal_theory + prelims_theory + final_theory) as total_theory,
            (
                terminal_practical + prelims_practical + final_practical
            ) as total_practical,
            (
                terminal_theory_total + prelims_theory_total + final_theory_total
            ) as total_theory_total,
            (
                terminal_practical_total + prelims_practical_total + final_practical_total
            ) as total_practical_total
        FROM
            (
                select
                    studentMaster.student_id as student_id,
                    student_name,
                    student_surname,
                    sum(
                        if(exam_type = "terminal", obtained_theory_marks, 0)
                    ) as terminal_theory,
                    sum(
                        if(
                            exam_type = "terminal",
                            obtained_practical_marks,
                            0
                        )
                    ) as terminal_practical,
                    sum(
                        if(exam_type = "prelims", obtained_theory_marks, 0)
                    ) as prelims_theory,
                    sum(
                        if(
                            exam_type = "prelims",
                            obtained_practical_marks,
                            0
                        )
                    ) as prelims_practical,
                    sum(
                        if(exam_type = "final", obtained_theory_marks, 0)
                    ) as final_theory,
                    sum(
                        if(exam_type = "final", obtained_practical_marks, 0)
                    ) as final_practical,
                    sum(
                        if(exam_type = "terminal", total_theory_marks, 0)
                    ) as terminal_theory_total,
                    sum(
                        if(exam_type = "terminal", total_practical_marks, 0)
                    ) as terminal_practical_total,
                    sum(if(exam_type = "prelims", total_theory_marks, 0)) as prelims_theory_total,
                    sum(
                        if(exam_type = "prelims", total_practical_marks, 0)
                    ) as prelims_practical_total,
                    sum(if(exam_type = "final", total_theory_marks, 0)) as final_theory_total,
                    sum(
                        if(exam_type = "final", total_practical_marks, 0)
                    ) as final_practical_total
                FROM subjectMaster
                    JOIN examMaster ON examMaster.subject_id = subjectMaster.subject_id
                    JOIN studentMaster ON examMaster.student_id = studentMaster.student_id
                GROUP BY
                    studentMaster.student_id ${limitString}
            ) AS result_view
    ) AS final_result_view;`;

}

const sql_query_for_getStudentResult = (student_id) => {
    return `select
    subject_name,
    CONCAT(terminal_theory, "/", terminal_theory_total) as Terminal_theory,
    CONCAT(terminal_practical, "/", terminal_practical_total) as Terminal_practical,
    CONCAT(prelims_theory, "/", prelims_theory_total) as Prelims_therory,
    CONCAT(prelims_practical, "/", prelims_practical_total) as Prelims_practical,
    CONCAT(final_theory, "/", final_theory_total) as Final_theory,
    CONCAT(final_practical, "/", final_practical_total) as Final_practical,
    CONCAT(total_theory, "/", total_theory_total) as Overall_theory,
    CONCAT(total_practical, "/", total_practical_total) as Overall_practical,
    CONCAT((total_theory + total_practical), "/", (total_theory_total + total_practical_total)) as Overall_total
FROM
(
        select 
            subject_name,
            terminal_theory,
            terminal_practical,
            prelims_theory,
            prelims_practical,
            final_theory,
            final_practical,
            terminal_theory_total,
            terminal_practical_total,
            prelims_theory_total,
            prelims_practical_total,
            final_theory_total,
            final_practical_total,
            (terminal_theory + prelims_theory + final_theory) as total_theory,
            (
                terminal_practical + prelims_practical + final_practical
            ) as total_practical,
            (
                terminal_theory_total + prelims_theory_total + final_theory_total
            ) as total_theory_total,
            (
                terminal_practical_total + prelims_practical_total + final_practical_total
            ) as total_practical_total
        FROM
            (
                select
                    studentMaster.student_id as student_id,
                    subject_name,
                    sum(
                        if(exam_type = "terminal", obtained_theory_marks, 0)
                    ) as terminal_theory,
                    sum(
                        if(
                            exam_type = "terminal",
                            obtained_practical_marks,
                            0
                        )
                    ) as terminal_practical,
                    sum(
                        if(exam_type = "prelims", obtained_theory_marks, 0)
                    ) as prelims_theory,
                    sum(
                        if(
                            exam_type = "prelims",
                            obtained_practical_marks,
                            0
                        )
                    ) as prelims_practical,
                    sum(
                        if(exam_type = "final", obtained_theory_marks, 0)
                    ) as final_theory,
                    sum(
                        if(exam_type = "final", obtained_practical_marks, 0)
                    ) as final_practical,
                    sum(
                        if(exam_type = "terminal", total_theory_marks, 0)
                    ) as terminal_theory_total,
                    sum(
                        if(exam_type = "terminal", total_practical_marks, 0)
                    ) as terminal_practical_total,
                    sum(if(exam_type = "prelims", total_theory_marks, 0)) as prelims_theory_total,
                    sum(
                        if(exam_type = "prelims", total_practical_marks, 0)
                    ) as prelims_practical_total,
                    sum(if(exam_type = "final", total_theory_marks, 0)) as final_theory_total,
                    sum(
                        if(exam_type = "final", total_practical_marks, 0)
                    ) as final_practical_total
                FROM subjectMaster
                    JOIN examMaster ON examMaster.subject_id = subjectMaster.subject_id
                    JOIN studentMaster ON examMaster.student_id = studentMaster.student_id and studentMaster.student_id=${student_id}
                GROUP BY
                    subjectMaster.subject_id
            ) AS result_view
    ) AS final_result_view;`;
};

const sql_for_get_student_name = (student_id)=>{
    return `select
    CONCAT(student_name," ",student_surname) as full_name
FROM
    subjectMaster
    JOIN examMaster ON examMaster.subject_id = subjectMaster.subject_id
    JOIN studentMaster ON examMaster.student_id = studentMaster.student_id
where
    studentMaster.student_id = ${student_id}
    GROUP BY studentMaster.student_name;`
} 

module.exports = { object_to_keys, Table_title, query_for_entire_records, sql_query_for_pagination, sql_query_for_getStudentResult,sql_for_get_student_name }