import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { nanoid } from "nanoid";

const formSchema = Yup.object().shape({
  title: Yup.string()
    .required("Task başlığı yazmalısınız")
    .min(3, "Task başlığı en az 3 karakter olmalı"),
  description: Yup.string()
    .required("Task açıklaması yazmalısınız")
    .min(10, "Task açıklaması en az 10 karakter olmalı"),
  people: Yup.array()
    .min(1, "Lütfen en az bir kişi seçin")
    .max(3, "En fazla 3 kişi seçebilirsiniz"),
});

const TaskHookForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
  });

  const selectedPeople = watch("people", []);

  const handleCheckboxChange = (person) => {
    const newPeople = selectedPeople.includes(person)
      ? selectedPeople.filter((p) => p !== person)
      : [...selectedPeople, person];
    setValue("people", newPeople, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title")}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p className="input-error" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description")}
          aria-invalid={!!errors.description}
        ></textarea>
        {errors.description && (
          <p className="input-error" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((person) => (
            <label className="input-checkbox" key={person}>
              <input
                type="checkbox"
                checked={selectedPeople.includes(person)}
                onChange={() => handleCheckboxChange(person)}
              />
              {person}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error" role="alert">
            {errors.people.message}
          </p>
        )}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskHookForm;
