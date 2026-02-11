#BMI ANALYSIS
def calculate_bmi(weight, height):
  bmi = weight / (height ** 2)
  return bmi

def analyze_bmi(bmi):     # BMI values < 18.5 UW, 18.5 - 24.9 N, > 25 OV, > 30 OB
  if bmi < 18.5:
    return "Underweight"
  elif bmi
