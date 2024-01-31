import requests
from bs4 import BeautifulSoup
import json


def fetch_course_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")

        courses_data = []
        course_containers = soup.find_all("div", class_="node", role="region")

        for container in course_containers:
            subject_code_element = container.find("div", class_="title-subjectcode")
            course_description_element = container.find(
                "div", class_="title-coursedescr"
            )
            credit_info_element = container.find("li", class_="credit-info")

            if (
                subject_code_element
                and course_description_element
                and credit_info_element
            ):
                subject_code_parts = subject_code_element.text.strip().split(" ")
                if len(subject_code_parts) >= 2:
                    subject_code = subject_code_parts[0]  # Subject
                    course_number = subject_code_parts[1]  # Course number
                else:
                    continue  # Skip if subject code is not in the expected format

                course_description = (
                    course_description_element.text.strip()
                )  # Course description
                credit_element = credit_info_element.find("span", class_="credit-val")
                credit_value = credit_element.text.strip() if credit_element else "N/A"

                course_info = [
                    subject_code,
                    course_number,
                    course_description,
                    credit_value,
                ]
                courses_data.append(course_info)

        return courses_data
    else:
        print(f"Failed to fetch the webpage {url}. Status code:", response.status_code)
        return []


# URLs to query
url1 = "https://classes.cornell.edu/search/roster/SP24?q=&days-type=any&campus%5B0%5D=NYT&crseAttrs-type=any&breadthDistr-type=any&pi="
url2 = "https://classes.cornell.edu/search/roster/FA23?q=&days-type=any&campus%5B0%5D=NYT&crseAttrs-type=any&breadthDistr-type=any&pi="

courses_data_sp24 = fetch_course_data(url1)
courses_data_fa23 = fetch_course_data(url2)

combined_courses_data = courses_data_sp24 + courses_data_fa23

courses_json = json.dumps(combined_courses_data, indent=4)
file_name = "./app/public/courses_data.json"
with open(file_name, "w", encoding="utf-8") as file:
    file.write(courses_json)

print(f"Combined courses data saved to {file_name}")
