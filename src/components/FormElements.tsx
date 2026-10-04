import styled from "@emotion/styled";
import type { CSSObject } from "@emotion/react";

export const Container = styled.div((): CSSObject => ({
  maxWidth: 400,
  margin: "40px auto",
  padding: "20px",
}));

export const Title = styled.h1((): CSSObject => ({
  textAlign: "center",
  marginBottom: 30,
}));

export const Message = styled.p((): CSSObject => ({
  fontSize: 18,
  marginBottom: 20,
}));

export const Form = styled.form((): CSSObject => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
}));

export const FormGroup = styled.div((): CSSObject => ({
  display: "flex",
  flexDirection: "column",
}));

export const Label = styled.label((): CSSObject => ({
  marginBottom: 5,
  fontWeight: "600",
}));

export const Input = styled.input((): CSSObject => ({
  padding: 10,
  fontSize: 16,
  border: "1px solid #ccc",
  borderRadius: 4,
}));

export const Button = styled.button((): CSSObject => ({
  padding: 12,
  fontSize: 16,
  fontWeight: "600",
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
  },
  "&:disabled": {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
}));

export const SecondaryButton = styled.button((): CSSObject => ({
  padding: 12,
  fontSize: 16,
  fontWeight: "600",
  backgroundColor: "#fff",
  color: "#000",
  border: "1px solid #000",
  borderRadius: 4,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "&:disabled": {
    color: "#ccc",
    borderColor: "#ccc",
    cursor: "not-allowed",
  },
}));

export const Divider = styled.div((): CSSObject => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  color: "#666",
  fontSize: 14,
  margin: "4px 0",
  "&::before, &::after": {
    content: '""',
    flex: 1,
    borderBottom: "1px solid #ddd",
  },
  "&::before": {
    marginRight: 10,
  },
  "&::after": {
    marginLeft: 10,
  },
}));

export const ErrorMessage = styled.div((): CSSObject => ({
  color: "red",
  textAlign: "center",
  marginBottom: 10,
}));

export const SuccessMessage = styled.div((): CSSObject => ({
  color: "green",
  textAlign: "center",
  marginBottom: 10,
}));

export const LinkText = styled.p((): CSSObject => ({
  textAlign: "center",
  marginTop: 20,
  "& a": {
    color: "#000",
    fontWeight: "600",
  },
}));

export const WarningMessage = styled.div((): CSSObject => ({
  backgroundColor: "#fff3cd",
  color: "#856404",
  padding: 15,
  borderRadius: 4,
  marginBottom: 20,
  border: "1px solid #ffeeba",
}));

export const HelpText = styled.p((): CSSObject => ({
  fontSize: 14,
  color: "#666",
  marginTop: 5,
}));

export const PasswordRequirements = styled.div((): CSSObject => ({
  fontSize: 14,
  color: "#666",
  marginTop: 5,
  "& ul": {
    margin: 0,
    paddingLeft: 20,
  },
}));

export const ErrorBox = styled.div((): CSSObject => ({
  marginTop: 10,
  padding: 15,
  backgroundColor: "#fee",
  border: "1px solid #fcc",
  borderRadius: 5,
  color: "#c00",
}));

export const InfoMessage = styled.div((): CSSObject => ({
  textAlign: "center",
  marginBottom: 20,
  color: "#666",
}));

export const Section = styled.div((): CSSObject => ({
  marginTop: 30,
  padding: 20,
  backgroundColor: "#f5f5f5",
  borderRadius: 8,
}));

export const LoadingMessage = styled.div((): CSSObject => ({
  textAlign: "center",
  fontSize: 18,
  marginTop: 50,
}));

export const PasskeyList = styled.ul((): CSSObject => ({
  listStyle: "none",
  margin: "15px 0 0",
  padding: 0,
}));

export const PasskeyItem = styled.li((): CSSObject => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 15px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: 5,
  marginBottom: 10,
}));

export const DeleteButton = styled.button((): CSSObject => ({
  padding: "6px 12px",
  fontSize: 14,
  backgroundColor: "#fff",
  color: "#c00",
  border: "1px solid #c00",
  borderRadius: 5,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#fee",
  },
  "&:disabled": {
    color: "#ccc",
    borderColor: "#ccc",
    cursor: "not-allowed",
  },
}));
