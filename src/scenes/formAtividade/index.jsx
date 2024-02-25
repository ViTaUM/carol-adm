import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const FormAtividade = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 25; hour++) {
      // Inclui até 24:00
      const formattedHour = `${hour.toString().padStart(2, "0")}:00`;
      options.push(formattedHour);
    }
    return options;
  };

  return (
    <Box m="20px">
      <Header
        title="CRIAR ATIVIDADE"
        subtitle="Criar atividade para depois vincular aos alunas(os)."
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Atividade */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome da Atividade"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nameAtividade}
                name="nameAtividade"
                error={!!touched.nameAtividade && !!errors.nameAtividade}
                helperText={touched.nameAtividade && errors.nameAtividade}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Dias da Semana */}
              <FormControl
                fullWidth
                error={!!touched.semana && !!errors.semana}
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="semana-label">Dias da Semana</InputLabel>
                <Select
                  labelId="semana-label"
                  id="semana"
                  multiple
                  value={values.semana}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="semana"
                  renderValue={(selected) => selected.join(", ")}
                  // Se estiver usando uma versão do Material-UI que requer o componente Input,
                  // você pode precisar adicionar um componente Input aqui.
                >
                  {[
                    "Segunda-feira",
                    "Terça-feira",
                    "Quarta-feira",
                    "Quinta-feira",
                    "Sexta-feira",
                    "Sábado",
                  ].map((dia) => (
                    <MenuItem key={dia} value={dia}>
                      {dia}
                    </MenuItem>
                  ))}
                </Select>
                {!!touched.semana && !!errors.semana && (
                  <FormHelperText>{errors.semana}</FormHelperText>
                )}
              </FormControl>

              {/* Horário Inicial */}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.timeStart && !!errors.timeStart}
              >
                <InputLabel id="timeStart-label">Horário Inicial</InputLabel>
                <Select
                  labelId="timeStart-label"
                  id="timeStart"
                  value={values.timeStart}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="timeStart"
                >
                  {generateTimeOptions().map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
                {!!touched.timeStart && !!errors.timeStart && (
                  <FormHelperText>{errors.timeStart}</FormHelperText>
                )}
              </FormControl>

              {/* Horário Final */}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.timeFim && !!errors.timeFim}
              >
                <InputLabel id="timeFim-label">Horário Final</InputLabel>
                <Select
                  labelId="timeFim-label"
                  id="timeFim"
                  value={values.timeFim}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="timeFim"
                >
                  {generateTimeOptions().map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
                {!!touched.timeFim && !!errors.timeFim && (
                  <FormHelperText>{errors.timeFim}</FormHelperText>
                )}
              </FormControl>

              {/* Professor */}
              <TextField
                fullWidth
                variant="filled"
                select
                label="Professora"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idProfessor}
                name="idProfessor"
                error={!!touched.idProfessor && !!errors.idProfessor}
                helperText={touched.idProfessor && errors.idProfessor}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="Carol">Carol</MenuItem>
                <MenuItem value="Beatriz">Beatriz</MenuItem>
              </TextField>

              {/* Local */}
              <TextField
                fullWidth
                variant="filled"
                select
                label="Local"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.local}
                name="local"
                error={!!touched.local && !!errors.local}
                helperText={touched.local && errors.local}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="Studio Carol Dance">
                  Studio Carol Dance
                </MenuItem>
                <MenuItem value="Studio Mussurunga Dance">
                  Studio Mussurunga Dance
                </MenuItem>
                <MenuItem value="Experimental">Experimental</MenuItem>
              </TextField>
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Criar Atividade
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup
  .object({
    nameAtividade: yup.string().required("Escreva o nome da Atividade"),
    semana: yup
      .array()
      .of(yup.string())
      .min(1, "Selecione pelo menos um dia da semana"),
    timeStart: yup.string().required("Selecione um horário inicial"),
    timeFim: yup.string().required("Selecione um horário final"),
    idProfessor: yup.string().required("Selecione uma(o) professora(o)"),
    // Adicione outras validações necessárias aqui
  })
  .test(
    "time-check",
    "O Horário Final deve ser maior que o Horário Inicial",
    function (value) {
      const { timeStart, timeFim } = value;
      const [hoursStart, minutesStart] = timeStart.split(":").map(Number);
      const [hoursFim, minutesFim] = timeFim.split(":").map(Number);

      const startDate = new Date(0, 0, 0, hoursStart, minutesStart);
      const endDate = new Date(0, 0, 0, hoursFim, minutesFim);

      return endDate > startDate;
    }
  );

const initialValues = {
  nameAtividade: "",
  lastName: "",
  semana: [],
  timeStart: "",
  timeFim: "",
  idProfessor: "",
};

export default FormAtividade;
