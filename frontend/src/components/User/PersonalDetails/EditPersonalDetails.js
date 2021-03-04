import React from "react";
import styled from "styled-components";

const Container = styled.div.attrs({
    className: `flex flex-column pr6 pl6`
})``

const HeaderRow = styled.div.attrs({
    className: `flex`
})``

const TitleContainer = styled.div.attrs({
    className: `pa3 mb2 w-50`
})``
  
const Title = styled.p.attrs({
    className: `f2 measure fw1 mt3 ml-5`
})``

const BodyRow = styled.div.attrs({
    className: `flex flex-column items-center`
})``

const BodyDiv = styled.div.attrs({
    className: ``
})``

const Form = styled.form.attrs({
    className: `w-30`
})``

const FieldDiv = styled.div.attrs({
    className: ``
})``

const FieldText = styled.p.attrs({
    className: `f3 gray`
})``

const Input = styled.input.attrs({
    className: `input-reset ba b--black-20 pa2 mb4 db w-100`,
    type: `text`,
    ariaDescribedby: `name-desc`
})``

const SaveDiv = styled.div.attrs({
    className: `lh-copy mt3 tr`
})``

const Save = styled.a.attrs({
    className: `pointer f4 mr2 link dim black db`,
    href: ``
})``

// https://reactrouter.com/web/api/match
const PersonalDetails = ({ match }) => {
  // get user id from match.params.id and GET user data.

  return (
    <Container>
        <HeaderRow>
            <TitleContainer>
                <Title>Personal Details</Title>
            </TitleContainer>
        </HeaderRow>
        <BodyRow>
            <Form>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            First Name
                        </FieldText>
                    </FieldDiv>
                    <Input/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Last Name
                        </FieldText>
                    </FieldDiv>
                    <Input/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Address
                        </FieldText>
                    </FieldDiv>
                    <Input/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Phone Number
                        </FieldText>
                    </FieldDiv>
                    <Input/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Email Address
                        </FieldText>
                    </FieldDiv>
                    <Input/>
                </BodyDiv>
                <SaveDiv>
                    <Save>Save</Save>
                </SaveDiv>
            </Form>
        </BodyRow>
    </Container>
  );
};

export default PersonalDetails;
