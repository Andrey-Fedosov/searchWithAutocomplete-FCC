import { UserPropsType } from "./type";

export function Suggestions(props: {
  users: UserPropsType[];
  handleClick: (event: any) => void;
}) {
  return (
    <div>
      <ul>
        {props.users && props.users.length
          ? props.users.map((el: any, idx: number) => (
              <li onClick={props.handleClick} key={`idx${idx + 1}`}>
                {el}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
