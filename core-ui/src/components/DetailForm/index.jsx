/**
 *
 * @param {import(".").DetailProps} param0
 * @returns
 */
export default function DetailForm({ keys = [], values = {} }) {
  return (
    <table>
      <tbody>
        {keys.map((key, index) => (
          <tr key={`table ${index}`}>
            <td>
              <h4>{key[0].toUpperCase() + key.slice(1)}</h4>
            </td>
            <td>{values[key].type === "ENUM" ? (<select name={key} ></select>) : ()</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
